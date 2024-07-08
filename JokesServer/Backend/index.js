import 'dotenv/config';
import express from 'express';
const app = express()


app.get('/api/jokes', (req, res) => {
  const jokes = [
    {
      "type": "general",
      "setup": "What did the fish say when it hit the wall?",
      "punchline": "Dam."
    },
    {
      "type": "general",
      "setup": "How do you make a tissue dance?",
      "punchline": "You put a little boogie on it."
    },
    {
      "type": "general",
      "setup": "What's Forrest Gump's password?",
      "punchline": "1Forrest1"
    },
    {
      "type": "general",
      "setup": "What do you call a belt made out of watches?",
      "punchline": "A waist of time."
    },
    {
      "type": "general",
      "setup": "Why can't bicycles stand on their own?",
      "punchline": "They are two tired"
    },
    {
      "type": "general",
      "setup": "How does a train eat?",
      "punchline": "It goes chew, chew"
    },
    {
      "type": "general",
      "setup": "What do you call a singing Laptop?",
      "punchline": "A Dell"
    },
  ]
  res.send(jokes)
})



app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})