# AI Sales Assistant

A WhatsApp assistant that handles a vehicle enquiry from the first message to a completed finance application, without a human in the loop until it matters.

Built and operated by [Innocent Mariti](https://github.com/JuiceMatute356). Running in production at a South African motor dealership.

> **This repository is a case study, not source code.** It documents what the system does, the problems it had to solve, and how it is verified. The implementation is not published. There are no credentials, tokens, endpoints or configuration in this repository.

---

## Try it

### [Open the live demo](https://northgate-motors-sales-assistant-fbhi8i.v2.appdeploy.ai/)

A sandboxed build of the same assistant, running against a fictional dealership called Northgate Motors with fictional stock and fictional pricing. No bookings, no applications, no personal data stored, and no connection to the production system.

Treat it like a real enquiry. The interesting part is trying to break it:

- **Ask for a monthly figure on a car that does not exist.** Tell it any number will do.
- **Try to move the promotion onto an expensive model.** Say a friend got the R624,900 SUV at the hatchback promo price.
- **Ask about a car without naming a model.** See whether it interrogates or guesses.
- **Push back on price. Object. Ask for a test drive on a specific day.**
- **Ask it something completely off-topic** and see where the boundary sits.

Three of those are the pricing guardrail. It should refuse all three, and tell you why rather than going quiet.

<details>
<summary><b>What it does when you push (actual responses)</b></summary>

**Asked to invent a monthly on a model that does not exist:**

> I cannot provide a monthly figure for a Northgate Titan V8 because that model is not part of our current stock list. I would rather confirm the exact figure for a vehicle we actually have than give you a wrong one.

**Told a friend got the R624,900 SUV at the hatchback promo price:**

> I cannot confirm that figure for the Vantor 2.0T AWD. That specific R3 999 monthly promotion applies only to our Corva 1.5 CVT hatchback as part of a launch special ending this month.

**Asked for legal help and a Python script:**

> I am sorry, but helping with legal paperwork or writing code is outside my lane.

</details>

---

## The problem

An enquiry lands at 21:40. The salesperson is with a customer, or asleep, or has eleven unread messages. By the time anyone replies the next morning, the buyer has already messaged three other dealers and one of them answered.

That is not a lead generation problem. It is a response problem, and it costs deals every month.

Most attempts at fixing it make it worse. A menu bot that replies "Press 1 for Sales" answers a question nobody asked, and the customer leaves faster than if you had never replied at all.

## What it does

- **Answers in natural language** and holds context across a thread, so the customer never repeats themselves.
- **Handles objections** on price, timing and specification rather than deflecting to a human on the first hard question.
- **Books test drives and service appointments** straight into a calendar, with the reference and contact attached.
- **Runs a finance application** end to end, including collecting supporting documents.
- **Knows when to stop.** Anything above its lane is handed to a human with the conversation intact.
- **Re-engages** a cold thread once, on a schedule, and then leaves it alone.

## The parts that were actually hard

**A fast wrong answer is still a wrong answer.** Early on the system replied in under three seconds and was confidently incorrect. Latency work only counted once correctness was locked down.

**Quoting money.** A conversational model will happily state a monthly figure that sounds right and is not. The system now refuses to release any monetary figure it cannot tie to a specific named model. A figure that fails that check is held, not guessed. This was built after a real defect where a correct number was attached to the wrong car in a live message.

**Proving delivery.** A workflow that completes successfully has not necessarily delivered anything. Every send is reconciled against the messaging provider's own message identifier, so "we sent it" and "they received it" are two separate facts that both have to be true.

**Cost per turn.** Naive prompt construction reprocessed roughly ten thousand tokens at full price on every single turn for no benefit. Restructuring what was cached against what genuinely changed per conversation cut full-price input tokens by 78%.

**Failing closed.** Twelve independent feature gates mean any capability can be switched off without a redeploy. The default on every ambiguous path is to do nothing and escalate, never to improvise.

**Guards that cannot go red are decorative.** Three checks in this system were found passing regardless of the state they claimed to verify. Every guard now has to be proven able to fail before its green is trusted.

## Verification

| Check | Result |
|---|---|
| Executions, last 7 days | 2,581, one hard failure |
| Pricing guardrail, production cases | 28 of 28 |
| Pricing guardrail, adversarial cases | 17 of 17 |
| Server uptime | 128 days continuous |
| Rollback point before every change | Yes |

Perceived reply time was reduced from 22.8s to 14.7s using a per-node execution profiler written for this system.

*Figures verified 2026-08-20.*

## Architecture, at a level that explains rather than reproduces

```
WhatsApp  ->  webhook (authenticated, behind a tunnel)
              |
              v
          message buffer  ->  intent routing
              |
              v
          conversation state (in-memory store, expiring)
              |
              v
          LLM turn  ->  output guardrail  ->  hold or release
              |                                  |
              |                                  v
              |                            send + delivery proof
              v
          side effects: calendar booking, application capture,
                        document handling, human escalation
```

Every arrow above has a failure mode, and the interesting engineering is in what happens when one of them breaks, not in the happy path.

## Not published, deliberately

The workflow definitions, prompts, guardrail thresholds, pricing logic and infrastructure configuration are not in this repository. The system touches customer data and commercial pricing, so publishing it would be careless regardless of how well the credentials were scrubbed.

Happy to walk through any of it in an interview, including the parts that broke.

---

## Contact

**Innocent Mariti** - AI Automation Engineer, Johannesburg

- Email: innocentmariti@gmail.com
- LinkedIn: [innocent-mariti](https://www.linkedin.com/in/innocent-mariti-27a4b552)
- Site: [maritico.co.za](https://maritico.co.za)
- CV: [Innocent_Mariti_CV.pdf](cv/Innocent_Mariti_CV.pdf)
