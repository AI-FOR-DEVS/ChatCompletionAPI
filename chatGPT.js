import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const initializeChat = (socket) => {
  socket.on('message', async (message) => {
    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: message },
        { role: 'system', content: 'Add at least one joke to your reply' },
      ],
      stream: true,
    })

    for await (const part of stream) {
      socket.emit('response', part.choices[0]?.delta || '')
    }
  })
}
