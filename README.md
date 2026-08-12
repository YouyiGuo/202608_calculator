# 作業 2：新增一個 Function Calling 工具

新增工具：計算機

## 實作內容

新增 `calculator` 工具，讓 AI 可以透過 Function Calling 進行數學運算。

工具支援：

- 加法
- 減法
- 乘法
- 除法

## 執行方式

```bash
npm install
npm start
```

輸入 `exit` 可結束對話。

## 測試結果

已設計以下測試方向，可作為截圖證明：

1. 12 加 8 是多少
2. 100 減 37 是多少
3. 9 乘以 7 是多少
4. 144 除以 12 是多少
5. 先算 25 加 15，再把結果乘以 2
6. 陸萬加柒仟柒佰捌拾捌
7. 捌萬減去參
8. 七三
9. 九九

測試重點：AI 可以判斷何時呼叫計算機工具，並把工具回傳的結果整理成自然語言回答。

## 截圖證明方式

執行 `npm start` 後輸入需要計算的問題，終端機會顯示：

```text
[呼叫 tool] calculator({"operation":"add","a":12,"b":8})
[tool 結果] {"result":20}
12 加 8 等於 20。
```

截圖中只要同時看到 `[呼叫 tool] calculator(...)`、`[tool 結果]` 與 AI 最後回答，即可證明 AI 有在對話中正確呼叫計算機工具，且計算結果正確。

## 與作業 2 驗收標準對照

- 計算機工具包含完整工具定義和實作：已完成於 `src/tools/calculator.js`
- JSON Schema 定義正確：已定義 `type: "function"`、`name`、`description`、`parameters`、`required`
- AI 能在對話中正確呼叫計算機：主程式會輸出 `[呼叫 tool] calculator(...)`
- 計算結果正確：主程式會輸出 `[tool 結果]`，並讓 AI 根據工具結果回答
