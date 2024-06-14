"use client";
import { useState } from "react";
import MarkdownIt from "markdown-it";
import { Button, Input, ScrollArea, Modal } from "@mantine/core";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { useDisclosure } from "@mantine/hooks";
import { IconRobot } from "@tabler/icons-react";
import GeminiIcon from "@components/icons/GeminiIcon";

const GeminiChat = () => {
  const [prompt, setPrompt] = useState<string>("Halo, apa kabar?");
  const [output, setOutput] = useState<string>("");
  const [chatbotOpened, { open, close }] = useDisclosure(false);

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
      maxOutputTokens: 100,
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setOutput("Generating...");

    try {
      const result = await chat.sendMessageStream(prompt);

      let buffer = [];
      let md = new MarkdownIt();
      for await (let response of result.stream) {
        buffer.push(response.text());
        setOutput(md.render(buffer.join("")));
      }
    } catch (e) {
      setOutput("<hr>" + e);
    }
  };

  return (
    <>
      <Modal opened={chatbotOpened} onClose={close} title="Chatbot AI" className="lg:p-[10px]">
        <form onSubmit={handleSubmit}>
          <Input value={prompt} onChange={(event) => setPrompt(event.currentTarget.value)} placeholder="Tulis sesuatu..." required />
          <div className="my-4">
            <Button type="submit" variant="light" color="blue">
              Kirim
            </Button>
          </div>
        </form>
        <ScrollArea h={250}>
          <div dangerouslySetInnerHTML={{ __html: output }} />
        </ScrollArea>
        <div className="flex">
          <p>Powered by</p>
          <GeminiIcon className="size-[40px] ml-2 -translate-y-[9px]" />
        </div>
      </Modal>
      <button onClick={open} className="fixed right-[1rem] bottom-[1rem] z-20 bg-gray-200 rounded-full p-2">
        <IconRobot className="text-blue-400 lg:size-[50px] size-[40px]" />
      </button>
    </>
  );
};

export default GeminiChat;
