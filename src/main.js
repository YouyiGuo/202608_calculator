import { input } from "@inquirer/prompts";
import { client, DEFAULT_MODEL } from "./lib/openai.js";
import { calculatorTool, calculator } from "./tools/calculator.js";
import { spinner } from "./utils/spinner.js";

const AVAILABLE_TOOLS = {
  calculator,
};

const tools = [calculatorTool];
const MAX_TOOL_ROUNDS = 8;

const history = [
  {
    role: "developer",
    content:
      "你是一位計算機工具的數學助理。遇到需要計算的問題時，請呼叫 calculator 工具取得正確答案，再用繁體中文簡易回答。",
  },
];

try {
  while (true) {
    const userQuestion = (await input({ message: "請輸入你的問題：" })).trim();

    if (userQuestion === "") continue;
    if (userQuestion.toLowerCase() === "exit") {
      console.log("再見~");
      break;
    }

    history.push({
      role: "user",
      content: userQuestion,
    });

    let completed = false;

    for (let round = 1; round <= MAX_TOOL_ROUNDS; round += 1) {
      const spin = spinner("思考中...").start();

      const response = await client.responses.create({
        model: DEFAULT_MODEL,
        input: history,
        tools,
        tool_choice: "auto",
      });

      spin.stop();

      history.push(...response.output);

      const functionCalls = response.output.filter(
        (item) => item.type === "function_call",
      );

      if (functionCalls.length === 0) {
        console.log(response.output_text);
        completed = true;
        break;
      }

      for (const functionCall of functionCalls) {
        const fnName = functionCall.name;
        const args = JSON.parse(functionCall.arguments);
        console.log(`\n[呼叫 tool] ${fnName}(${JSON.stringify(args)})`);

        const fn = AVAILABLE_TOOLS[fnName];
        const result = await fn(args);

        history.push({
          type: "function_call_output",
          call_id: functionCall.call_id,
          output: JSON.stringify(result),
        });
      }
    }

    if (!completed) {
      throw new Error(`Tool calling 超過 ${MAX_TOOL_ROUNDS} 輪，已停止執行`);
    }
  }
} catch (err) {
  if (err.name === "ExitPromptError") {
    console.log("\n再見~");
  } else {
    throw err;
  }
}
