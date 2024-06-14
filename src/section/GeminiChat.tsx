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

  const renderOutput = (output: string) => {
    const codeRegex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g;
    const parts = output.split(codeRegex);

    return parts.map((part, index) => {
      if (index % 3 === 0) {
        // Regular HTML content
        return <div dangerouslySetInnerHTML={{ __html: part }} key={index} />;
      } else if ((index - 1) % 3 === 0) {
        // Language of the code block
        const language = parts[index];
        const code = parts[index + 1].replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
        return (
          <div key={index} style={{ position: "relative" }}>
            <CopyToClipboard text={code}>
              <Button style={{ position: "absolute", right: 0, top: 0 }} size="xs">
                Copy
              </Button>
            </CopyToClipboard>
            <SyntaxHighlighter language={language} style={tomorrow}>
              {code}
            </SyntaxHighlighter>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <>
      <Modal opened={chatbotOpened} onClose={close} title="Chatbot AI" className="lg:p-[10px]">
        <form onSubmit={handleSubmit}>
          <Textarea rows={5} value={prompt} onChange={(event) => setPrompt(event.currentTarget.value)} placeholder="Tulis sesuatu..." required />
          <div className="my-4">
            <Button type="submit" variant="light" color="blue">
              Kirim
            </Button>
          </div>
        </form>
        <ScrollArea h={250}>{renderOutput(output)}</ScrollArea>
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
