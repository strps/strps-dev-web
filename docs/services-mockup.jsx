import { useState, useEffect } from "react";

const services = [
  {
    id: "01",
    name: "Business websites & landing pages",
    forWho: "Small businesses, professionals, and startups that need a web presence that brings in customers — not just a digital business card.",
    items: [
      "Fast, modern site built with Next.js",
      "CMS included — update content yourself, no developer needed",
      "Mobile-first responsive design",
      "SEO fundamentals: metadata, performance, structured data",
      "Analytics, deployment, domain setup, and a clean handoff",
    ],
    timeline: "2–4 weeks",
    price: "Fixed quote after a free discovery call",
  },
  {
    id: "02",
    name: "Web applications & internal tools",
    forWho: "Teams drowning in spreadsheets or software that almost fits. Founders who need an MVP built right the first time.",
    items: [
      "Custom apps around your workflow — dashboards, portals, booking, admin",
      "React / Next.js front end, Node.js back end, PostgreSQL",
      "Accounts, roles, and permissions where you need them",
      "Clean, documented code you own completely — no lock-in",
      "Testing and deployment pipeline so updates don't break things",
    ],
    timeline: "4–10 weeks",
    price: "Scope-based quote",
  },
  {
    id: "03",
    name: "APIs, integrations & automation",
    forWho: "Businesses whose systems don't talk to each other, or who waste hours on tasks a script could do in seconds.",
    items: [
      "Custom REST or GraphQL APIs — Node.js, Express, FastAPI",
      "Integrations with the tools you already use",
      "Automation of repetitive workflows and reporting",
      "Database design and optimization",
      "Documentation your next developer will thank you for",
    ],
    timeline: "1–4 weeks",
    price: "Hourly or per-project",
  },
  {
    id: "04",
    name: "Ongoing support & maintenance",
    forWho: "Anyone who wants their site or app to stay fast, secure, and up to date without thinking about it.",
    items: [
      "Monthly updates, security patches, dependency upgrades",
      "Uptime and performance monitoring",
      "A block of hours for small changes each month",
      "Priority response when something breaks",
    ],
    timeline: "Monthly",
    price: "From $XXX/mo · cancel anytime",
  },
];

const process = [
  {
    step: "1",
    name: "Discovery",
    tag: "free",
    body: "We talk — call or email, your choice. You tell me what you need and what success looks like. If I'm not the right fit, I'll say so and point you somewhere better.",
  },
  {
    step: "2",
    name: "Proposal",
    tag: "written",
    body: "You get scope, timeline, and price in writing. Fixed price for fixed scope — no surprise invoices.",
  },
  {
    step: "3",
    name: "Build",
    tag: "weekly demos",
    body: "Short cycles, visible progress. You see the real thing early and often, so course corrections happen when they're cheap.",
  },
  {
    step: "4",
    name: "Launch & handoff",
    tag: "it's yours",
    body: "I deploy, walk you through everything, and hand over all code, credentials, and docs. Want me to stick around? That's what the support plan is for.",
  },
];

const faqs = [
  {
    q: "Do you work with clients outside Costa Rica?",
    a: "Yes — I work remotely with clients anywhere. I'm in GMT-6, which overlaps well with North American business hours. Fluent in Spanish and English.",
  },
  {
    q: "How much does a website cost?",
    a: "It depends on scope, which is why discovery calls are free. You'll always know the full price before we start — fixed quotes for fixed scope.",
  },
  {
    q: "Do I own the code?",
    a: "Completely. Everything I build for you — code, designs, content, accounts — is yours at handoff. No lock-in, no hostage situations.",
  },
  {
    q: "What if I need changes after launch?",
    a: "Small tweaks in the first two weeks after launch are included. After that, book me hourly or go with a monthly support plan.",
  },
  {
    q: "Can you work with my existing codebase?",
    a: "Usually, yes. Send me what you have and I'll tell you honestly whether it makes more sense to improve it or rebuild it.",
  },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "", budget: "" });
  const [sent, setSent] = useState(false);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 200);
    return () => clearTimeout(t);
  }, []);

  const submit = () => {
    if (form.name && form.email && form.message) setSent(true);
  };

  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .page {
          --bg: #171716;
          --surface: #1e1e1c;
          --line: #2c2c29;
          --line-strong: #3a3a36;
          --text: #e9e7e1;
          --muted: #8f8d84;
          --faint: #63615a;
          --accent: #e0a33e;
          background: var(--bg);
          color: var(--text);
          font-family: 'Archivo', system-ui, sans-serif;
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }
        .page * { box-sizing: border-box; margin: 0; }
        .wrap { max-width: 960px; margin: 0 auto; padding: 0 24px; }
        .mono {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--faint);
        }
        .rule { border: 0; border-top: 1px solid var(--line); }

        /* nav */
        nav { border-bottom: 1px solid var(--line); }
        .nav-in { display: flex; justify-content: space-between; align-items: center; height: 64px; }
        .logo { font-family: 'IBM Plex Mono', monospace; font-size: 14px; letter-spacing: 0.15em; color: var(--text); text-decoration: none; }
        .nav-links { display: flex; gap: 28px; }
        .nav-links a { color: var(--muted); text-decoration: none; font-size: 14px; transition: color .15s; }
        .nav-links a:hover, .nav-links a:focus-visible { color: var(--text); }
        .nav-links a.active { color: var(--text); }

        /* hero */
        .hero { padding: 110px 0 90px; }
        .badge { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 28px; }
        .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); }
        .badge span { font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: .06em; color: var(--muted); }
        h1 {
          font-size: clamp(34px, 5.5vw, 58px);
          font-weight: 500;
          line-height: 1.08;
          letter-spacing: -0.02em;
          max-width: 15ch;
        }
        .hero p { color: var(--muted); font-size: 17px; line-height: 1.65; max-width: 54ch; margin-top: 26px; }
        .plot { display: block; margin-top: 34px; }
        .plot path {
          stroke: var(--accent);
          stroke-width: 1.5;
          fill: none;
          stroke-dasharray: 620;
          stroke-dashoffset: 620;
          transition: stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1);
        }
        .plot path.drawn { stroke-dashoffset: 0; }
        @media (prefers-reduced-motion: reduce) {
          .plot path { stroke-dashoffset: 0; transition: none; }
        }
        .hero-cta { display: flex; gap: 16px; margin-top: 40px; flex-wrap: wrap; }
        .btn {
          font-family: 'Archivo', sans-serif;
          font-size: 15px;
          padding: 13px 26px;
          border-radius: 2px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all .15s;
        }
        .btn-solid { background: var(--text); color: var(--bg); }
        .btn-solid:hover { background: var(--accent); }
        .btn-ghost { background: transparent; color: var(--muted); border-color: var(--line-strong); }
        .btn-ghost:hover { color: var(--text); border-color: var(--muted); }
        .btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

        /* section header */
        .sec { padding: 90px 0 0; }
        .sec-head { display: flex; align-items: baseline; gap: 18px; padding-bottom: 22px; border-bottom: 1px solid var(--line); }
        .sec-head h2 { font-size: 24px; font-weight: 500; letter-spacing: -0.01em; }
        .sec-intro { color: var(--muted); font-size: 16px; line-height: 1.65; margin-top: 22px; max-width: 60ch; }

        /* services */
        .svc { display: grid; grid-template-columns: 90px 1fr; gap: 24px; padding: 44px 0; border-bottom: 1px solid var(--line); }
        .svc-id { font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: var(--faint); padding-top: 5px; }
        .svc h3 { font-size: 20px; font-weight: 500; }
        .svc-for { color: var(--muted); font-size: 15px; line-height: 1.6; margin-top: 10px; max-width: 58ch; }
        .svc ul { list-style: none; padding: 0; margin: 20px 0 0; }
        .svc li { color: var(--text); font-size: 15px; line-height: 1.5; padding: 7px 0 7px 20px; position: relative; }
        .svc li::before { content: ''; position: absolute; left: 0; top: 15px; width: 8px; height: 1px; background: var(--accent); }
        .svc-meta { display: flex; gap: 32px; margin-top: 22px; flex-wrap: wrap; }
        .svc-meta div span { display: block; }
        .meta-val { font-size: 14px; color: var(--text); margin-top: 4px; }

        /* process */
        .proc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1px; background: var(--line); border: 1px solid var(--line); margin-top: 36px; }
        .proc { background: var(--bg); padding: 26px 22px 30px; }
        .proc-top { display: flex; justify-content: space-between; align-items: baseline; }
        .proc-step { font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: var(--accent); }
        .proc h3 { font-size: 16px; font-weight: 500; margin-top: 14px; }
        .proc p { color: var(--muted); font-size: 14px; line-height: 1.6; margin-top: 10px; }

        /* faq */
        .faq { border-bottom: 1px solid var(--line); }
        .faq button {
          width: 100%; display: flex; justify-content: space-between; align-items: center;
          background: none; border: 0; color: var(--text);
          font-family: 'Archivo', sans-serif; font-size: 16px; text-align: left;
          padding: 22px 0; cursor: pointer;
        }
        .faq button:hover { color: var(--accent); }
        .faq button:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
        .faq-x { font-family: 'IBM Plex Mono', monospace; color: var(--faint); font-size: 16px; flex-shrink: 0; margin-left: 16px; }
        .faq-a { color: var(--muted); font-size: 15px; line-height: 1.65; padding: 0 0 24px; max-width: 62ch; }

        /* contact */
        .contact { padding: 90px 0 110px; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 60px; margin-top: 36px; }
        .contact h2 { font-size: 24px; font-weight: 500; }
        .contact-note { color: var(--muted); font-size: 15px; line-height: 1.65; margin-top: 16px; max-width: 40ch; }
        .contact-alt { margin-top: 30px; }
        .contact-alt a { color: var(--text); text-decoration: none; border-bottom: 1px solid var(--line-strong); font-size: 15px; }
        .contact-alt a:hover { border-color: var(--accent); }
        .field { margin-bottom: 18px; }
        .field label { display: block; margin-bottom: 8px; }
        .field input, .field textarea, .field select {
          width: 100%; background: var(--surface); border: 1px solid var(--line);
          color: var(--text); font-family: 'Archivo', sans-serif; font-size: 15px;
          padding: 12px 14px; border-radius: 2px; transition: border-color .15s;
        }
        .field textarea { min-height: 110px; resize: vertical; }
        .field input:focus, .field textarea:focus, .field select:focus {
          outline: none; border-color: var(--accent);
        }
        .sent { border: 1px solid var(--line-strong); padding: 40px; text-align: center; }
        .sent .mono { color: var(--accent); }
        .sent p { margin-top: 12px; color: var(--muted); font-size: 15px; }

        footer { border-top: 1px solid var(--line); padding: 28px 0; }
        .foot { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .foot span, .foot a { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--faint); text-decoration: none; }
        .foot a:hover { color: var(--text); }

        @media (max-width: 720px) {
          .svc { grid-template-columns: 1fr; gap: 10px; }
          .contact-grid { grid-template-columns: 1fr; gap: 44px; }
          .hero { padding: 70px 0 60px; }
          .nav-links { gap: 18px; }
        }
      `}</style>

      <nav>
        <div className="wrap nav-in">
          <a className="logo" href="#">STRPS</a>
          <div className="nav-links">
            <a href="#" className="active">Services</a>
            <a href="#">Projects</a>
            <a href="#">Lab</a>
            <a href="#">Blog</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="wrap">
          <div className="badge">
            <span className="dot" aria-hidden="true"></span>
            <span>Available for new projects — Q3 2026</span>
          </div>
          <h1>Websites and web apps that work as hard as you do.</h1>
          <svg className="plot" width="340" height="18" viewBox="0 0 340 18" aria-hidden="true">
            <path className={drawn ? "drawn" : ""} d="M2 14 C 60 14, 70 4, 120 4 S 200 14, 250 14 S 320 5, 338 8" />
          </svg>
          <p>
            I'm César — a full stack developer in San José, Costa Rica. I help businesses
            and founders turn ideas into fast, reliable digital products, from a landing
            page that converts to a custom tool that saves your team hours every week.
          </p>
          <div className="hero-cta">
            <button className="btn btn-solid" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Tell me about your project
            </button>
            <button className="btn btn-ghost">See my work</button>
          </div>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="mono">Services</span>
            <h2>What I can build for you</h2>
          </div>
          <p className="sec-intro">
            No agencies, no handoffs, no telephone game. You work directly with the person
            writing the code — from the first call to launch and beyond.
          </p>

          {services.map((s) => (
            <article className="svc" key={s.id}>
              <div className="svc-id">/{s.id}</div>
              <div>
                <h3>{s.name}</h3>
                <p className="svc-for">{s.forWho}</p>
                <ul>
                  {s.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
                <div className="svc-meta">
                  <div>
                    <span className="mono">Timeline</span>
                    <span className="meta-val">{s.timeline}</span>
                  </div>
                  <div>
                    <span className="mono">Pricing</span>
                    <span className="meta-val">{s.price}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="mono">Process</span>
            <h2>How I work</h2>
          </div>
          <div className="proc-grid">
            {process.map((p) => (
              <div className="proc" key={p.step}>
                <div className="proc-top">
                  <span className="proc-step">{p.step} / 4</span>
                  <span className="mono">{p.tag}</span>
                </div>
                <h3>{p.name}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="mono">FAQ</span>
            <h2>Common questions</h2>
          </div>
          <div style={{ marginTop: 12 }}>
            {faqs.map((f, i) => (
              <div className="faq" key={f.q}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  {f.q}
                  <span className="faq-x" aria-hidden="true">{openFaq === i ? "–" : "+"}</span>
                </button>
                {openFaq === i && <p className="faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="wrap contact-grid">
          <div>
            <span className="mono">Contact</span>
            <h2 style={{ marginTop: 14 }}>Have a project in mind?</h2>
            <p className="contact-note">
              Tell me what you're trying to build — a couple of sentences is enough
              to get started. I reply within one business day.
            </p>
            <div className="contact-alt">
              <span className="mono" style={{ display: "block", marginBottom: 10 }}>Prefer email?</span>
              <a href="mailto:csrstrps@gmail.com">csrstrps@gmail.com</a>
            </div>
          </div>

          {sent ? (
            <div className="sent">
              <span className="mono">Message sent</span>
              <p>Thanks, {form.name.split(" ")[0]}. I'll get back to you within one business day.</p>
            </div>
          ) : (
            <div>
              <div className="field">
                <label className="mono" htmlFor="f-name">Name</label>
                <input id="f-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="field">
                <label className="mono" htmlFor="f-email">Email</label>
                <input id="f-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="field">
                <label className="mono" htmlFor="f-msg">What do you need?</label>
                <textarea id="f-msg" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <div className="field">
                <label className="mono" htmlFor="f-budget">Budget range (optional)</label>
                <select id="f-budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
                  <option value="">Not sure yet</option>
                  <option>Under $1k</option>
                  <option>$1k – $5k</option>
                  <option>$5k – $15k</option>
                  <option>$15k+</option>
                </select>
              </div>
              <button className="btn btn-solid" onClick={submit} style={{ width: "100%" }}>
                Send message
              </button>
            </div>
          )}
        </div>
      </section>

      <footer>
        <div className="wrap foot">
          <span>© 2024–2026 CESAR JEREZ</span>
          <span>San José, CR · GMT-6</span>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="https://github.com/strps">GitHub</a>
            <a href="https://www.linkedin.com/in/cesar-jerez-e/">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}