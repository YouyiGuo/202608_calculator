export const calculatorTool = {
  type: "function",
  name: "calculator",
  description: "進行基本數學運算，支援加法、減法、乘法與除法。",
  parameters: {
    type: "object",
    properties: {
      operation: {
        type: "string",
        enum: ["add", "subtract", "multiply", "divide"],
        description: "要執行的運算類型：add、subtract、multiply、divide",
      },
      a: {
        type: "number",
        description: "第一個數字",
      },
      b: {
        type: "number",
        description: "第二個數字",
      },
    },
    required: ["operation", "a", "b"],
    additionalProperties: false,
  },
  strict: true,
};

export async function calculator({ operation, a, b }) {
  if (operation === "add") {
    return { result: a + b };
  }

  if (operation === "subtract") {
    return { result: a - b };
  }

  if (operation === "multiply") {
    return { result: a * b };
  }

  if (operation === "divide") {
    if (b === 0) {
      return { error: "除數不能為 0" };
    }

    return { result: a / b };
  }

  return { error: `不支援的運算：${operation}` };
}
