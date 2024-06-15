"use client";
import { useState } from "react";
import MarkdownIt from "markdown-it";
import { Button, ScrollArea, Modal, Textarea } from "@mantine/core";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { useDisclosure } from "@mantine/hooks";
import { IconRobot } from "@tabler/icons-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import GeminiIcon from "@components/icons/GeminiIcon";

const GeminiChat = () => {
  const [prompt, setPrompt] = useState<string>("Halo, apa kabar?");
  const [output, setOutput] = useState<string>("");
  const [chatbotOpened, { open, close }] = useDisclosure(false);
  const [chatHistory, setChatHistory] = useState<{ user: string; gemini: string }[]>([]);

  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ],
  });

  const chat = model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 100000,
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setOutput("Generating...");

    if (isAskingDate(prompt)) {
      const dateResponse = getCurrentDate();
      setChatHistory((prev) => [...prev, { user: prompt, gemini: dateResponse }]);
      setOutput(dateResponse);
      return;
    }

    try {
      const result = await chat.sendMessageStream(prompt);

      let buffer = [];
      let md = new MarkdownIt();
      for await (let response of result.stream) {
        buffer.push(response.text());
        const renderedOutput = md.render(buffer.join(""));
        setOutput(renderedOutput);
        setChatHistory((prev) => [...prev, { user: prompt, gemini: renderedOutput }]);
      }
    } catch (e) {
      setOutput("<hr>" + e);
    }
  };

  const isAskingDate = (message: string): boolean => {
    const dateQuestions = [
      "hari apa",
      "tanggal berapa",
      "bulan apa",
      "tahun berapa",
      "hari ini",
      "sekarang tanggal",
      "sekarang hari apa",
    ];
    return dateQuestions.some((question) => message.toLowerCase().includes(question));
  };

  const getCurrentDate = (): string => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return now.toLocaleDateString("id-ID", options);
  };

  const ChatBubble = ({ sender, message }: { sender: "user" | "gemini"; message: string }) => (
    <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"} my-2`}>
      <div className={`p-3 rounded-lg ${sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
        <div dangerouslySetInnerHTML={{ __html: message }} />
      </div>
    </div>
  );

  return (
    <>
      <Modal opened={chatbotOpened} onClose={close} title="Chatbot AI" className="lg:p-[10px]">
        <div className="flex flex-col h-[500px]">
          <ScrollArea className="flex-grow overflow-y-auto">
            <div className="p-4">
              {chatHistory.map((chat, index) => (
                <div key={index}>
                  <ChatBubble sender="user" message={chat.user} />
                  <ChatBubble sender="gemini" message={chat.gemini} />
                </div>
              ))}
            </div>
          </ScrollArea>
          <form onSubmit={handleSubmit} className="flex items-center p-4 border-t border-gray-200">
            <Textarea value={prompt} onChange={(event) => setPrompt(event.currentTarget.value)} placeholder="Masukkan pesan..." className="flex-grow mr-4" />
            <Button type="submit" variant="outline" color="blue">
              Kirim
            </Button>
          </form>
        </div>
      </Modal>
      <button onClick={open} className="fixed right-[1rem] bottom-[1rem] z-20 bg-gray-200 rounded-full p-2">
        <IconRobot className="text-blue-400 lg:size-[50px] size-[40px]" />
      </button>
    </>
  );
};

export default GeminiChat;
