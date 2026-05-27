---
title: "Learning Lithuanian with an agent: building my own teacher"
date: 2026-05-27
lang: en
description: "An experiment with Hermes and Obsidian that turned into a short note about software being designed not just for people, but for the agents working alongside them."
---

I am learning Lithuanian. There are no applications I love to use. Sure, I could quickly generate yet another low-quality app, but why would I write yet another language-learning app in 2026? It is far more interesting to take the agent route: sit Hermes down with my notes, my vocabulary and my grammar, and spend my time designing tools for it rather than building yet another interface.

This is not a post about the best way to learn Lithuanian. It is not a Hermes tutorial either. It is a small note about a shift in software design: an app is no longer just a screen for a human, it becomes a workspace for the pair "human + agent".

## Iteration 1. Obsidian with an agent on top

The simplest start took a few minutes: an Obsidian vault with words and grammar rules, with Hermes on top playing the role of a chat tutor.

![Telegram chat with the Mokytojas agent: it reads the Obsidian vault and asks the first word](/images/agent-first-lithuanian/01-obsidian-chat-en.png)

It worked badly. But the funny part: I could give it feedback right in the chat, and it kept getting better. Adding cards, linking them to grammar notes, saving the important stuff into long-term memory. The interaction stopped feeling like "I write a script" and started feeling like "I am mentoring an intern".

The problems became obvious fast:

- about 20 seconds of waiting per word, which is fatal for drilling;
- tokens burn at a real rate;
- the "one question, one chat reply" loop does not scale;
- the lesson context lives too close to a chat thread and not enough like a stable product.

First takeaway: an agent as a tutor is possible, but a chat is a bad surface for daily practice.

## Iteration 2. Retro with the agent

Here came an interesting move. Instead of designing the next architecture myself, I ran a retrospective with the agent and asked what it would change.

![The agent reviews the feedback and proposes an HTML lesson idea](/images/agent-first-lithuanian/02-retro-html-idea-en.png)

It proposed: "let me generate an HTML lesson for you, you go through it locally, and then send the result back to me for review".

Sounds dubious, but interesting. Worth a try.

What I like about this moment is not the HTML idea itself, but the way of working. I am not just prompting the model for the next reply. I am giving it experience, feedback, and the right to suggest the next step.

## Iteration 3. HTML lessons

It actually worked. Hermes assembles a 5-10 minute lesson tuned to my level and ships it as an HTML file. I go through it in the browser, then copy a JSON blob with my answers and comments, send it to the chat, and the agent reviews the result and updates the SRS.

![The agent sends an HTML lesson file, the user returns a JSON with answers](/images/agent-first-lithuanian/03-html-mvp-en.png)

![Screenshot of the HTML lesson UI in the browser, with a Lithuanian grammar exercise](/images/agent-first-lithuanian/04-lesson-ui-en.png)

At first glance, great. No longer a chat, but a small personal lesson: tasks, progress, answers, comments, error review.

At second glance, still a useless toy:

- HTML takes a long time to generate, and each lesson burns a lot of tokens;
- data exchange is awkward: copying JSON back and forth gets old quickly;
- no consistency: every lesson has a slightly different UI and slightly different structure;
- the agent reinvents the surface every time instead of working through a stable contract.

And then it clicked: the problem is not that HTML is bad. The problem is that the agent does not need a pretty screen. The agent needs stable commands, well-defined files, a data schema, lesson state, error history, and the ability to create tasks.

In other words, it needs a CLI.

## Iteration 4. A CLI and a product for two users

Next step: build a CLI through which the agent can actually manage content and lessons.

I went further and built what I want to call an agent-first product. I am not sure I love the term, but for now it captures the idea: a product where the agent is not a bolt-on AI feature, but one of the system's primary users.

In my case it looks like this:

- the agent uses the CLI to manage content: cards, grammar, SRS schedule, lesson generation;
- I, as a human, go through lessons in a small clean interface and leave comments;
- I have no separate admin UI for hand-editing content, and that is on purpose;
- if there is a bug or a good idea, the agent can open an issue in the GitHub repository for the CLI.

At this point I have roughly a hundred words in there and about ten custom lessons, all generated on request. The numbers are small, but that is the point: this is still a personal experiment, not a product "for everyone".

The reasonable question here: why not just take Anki or Quizlet and plug an agent into them?

Sure, you could. But any integration with an existing product is a compromise: a set of constraints layered on top of someone else's mental model. For an experiment, I wanted full flexibility: change the card schema, the lesson format, SRS behaviour and the feedback loop to match how the agent works with me, not the other way around.

**In a normal app I would ask: what screen does the user need? Here the question became different: what interface does the agent need, so it can be a good teacher?**

It does not need buttons. It needs stable commands, well-defined files, lesson state, error history, and the ability to create tasks. And I, the human, need the opposite: a simple five-minute screen with no chat lag.

The result is a strange but useful construction: one product, two different interfaces, two different users.

## The agent as teacher and product manager

The most interesting thing turned out to be not the CLI itself, but the way I started working with the agent.

I gave my Hermes two roles at once: teacher and product manager. It walks me through lessons, and in parallel analyses my feedback and logs. If it catches a bug or a good idea, it opens an issue in the GitHub repo on its own. From there the task goes to a different agent, for implementation. I show up at the end of that chain to triage a backlog that came out of my own lessons but was written by the agent.

It is a funny but meaningful shift: the agent stops being an assistant inside the product and becomes a participant in the product cycle. It sees usage, collects feedback, frames tasks, and changes the system in which it then keeps working. I will probably write a separate post about this.

## What I took away

The main thing that fell out of the experiment:

**Agent-first products look like a separate class of small products.** Not "AI inside an app", but a system where the agent is a real second user and everything is deliberately designed for human and agent to work together. The app itself is not the final form of the tool: the need stayed the same (learn the language), but the shape moved from "an app for a human" to "a workspace and tools where an agent works alongside a human".

Three feelings I keep pulling out of this.

**1. You mentor a colleague, not write a script.**  
Working with an agent is closer to working with a junior colleague: you give feedback, explain context, correct behaviour, sometimes praise. The main unit is not the prompt, but feedback and long-term memory. Without memory, everything falls apart and you keep starting from scratch.

**2. You design tools, not an app.**  
CLIs, files, formats, states, data schemas. All of it so the agent can be effective. It is less flashy than a pretty UI, but often more important: a good toolkit gives the agent leverage it would not otherwise have.

**3. The product gets a second user, and sometimes that user becomes the main one.**  
The first user is me, the human who wants to drill Lithuanian quickly and pleasantly. The second is the agent, which needs to read state, edit cards, see errors, plan lessons and create tasks. By volume of operations, the agent is already working with the system more than I am. I am more the person for whom the agent runs the system.

This does not magically work out of the box. To get such a process to a normal daily routine takes a lot of fiddling. But the feel of it is radically different.

## What's next

Next time I plan to walk through the CLI and the agent-first app for Lithuanian itself: the commands, the SRS, how the agent generates lessons, how tasks land on GitHub.
