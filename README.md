# MCP To-Do: An Agentic AI Project

## Overview

This project demonstrates the integration of **React**, **MCP (Model Context Protocol)**, and **Agentic AI** to create an intelligent to-do list application. The system allows users to interact with their tasks using natural language through an LLM-powered agent.

## My Journey: From Theory to Practice

### Background
My recent work has focused on agentic AI, including LangChain, function calling, and tool-based LLMs. This project represents a culmination of learning React and MCP, transforming theoretical knowledge into practical application.

### How React Finally Clicked

**Before this project:**
- Knew React, but foundation was shaky
- Relied on copy-paste solutions; struggled with debugging
- Difficulty building from scratch without constant Googling
- Avoided advanced concepts like routing, props, and state management

**During this project:**
- Applied React daily in real project settings
- Received feedback, mentorship, and learned
- Forced to slow down and understand concepts

**Key learnings/improvements:**
- Understood props and component structure (when and why to use them)
- Learned to break down UIs into reusable pieces
- Became proficient with Hooks (useEffect and useState)
- Understood React's reactivity model
- Gained confidence with React Router, lifting state up, conditional rendering, and async fetches

**Overall impact:** Transformed from theoretical knowledge to practical application in React development.

## What Is an MCP Server?

At a high level, **MCP (Model Context Protocol)** is an open protocol that standardizes how applications provide context to LLMs.

### Analogy
Just as USB-C provides a standardized way to connect your devices to various peripherals and accessories, MCP provides a standardized way to connect AI models to different data sources and tools.

### Architecture
- **MCP Clients:** Examples include Claude Desktop or custom LLM agents
- **MCP Servers:** Lightweight servers that expose specific capabilities or tools
- **Local & Remote Data Sources:** Databases, APIs, files, etc., accessible by servers
- **Connection Process:** Clients initiate connections to one or more MCP servers. The servers expose tools or data for the LLM's reasoning

### Benefits
- **Flexibility:** Easily switch between LLMs
- **Tool Management:** Keep tools local
- **Modularity & Standardization:** Allows you to connect to servers that already exist and use their tools regardless of your LLM

## How I Built My MCP Server

Built an MCP server using **FastMCP**, designed to work with any LLM (in my case, Gemini).

### Project Overview
The first project was a to-do list agent, giving the LLM read and write access to a database. The LLM could interpret natural language commands (e.g., "Add grocery shopping for Thursday") and decide on actions.

### Technical Implementation
- Tools were defined as Python functions, annotated with `@mcp.tool`
- Grounded natural language tool schema into prompt rather than defining schemas
- Examples of tools included:
  - `create_task` (expects task name, due date)
  - `get_tasks` (returns active tasks)
- The server handled incoming JSON requests, routing them to the correct tool
- The LLM analyzed natural language, chose the tool, populated arguments, and received structured responses

### Model Trade-offs
A key observation was the trade-off between Gemini and Anthropic models (like Claude):

**Claude:**
- Better native MCP support and tighter integration with UI tools
- Built-in features like "Resources" and "Prompts" that simplify workflow
- Originally backed by Anthropic, providing Claude with native integration

**Gemini:**
- Gives you flexibility and is cheaper to work with
- May require more custom work
- Fast and cost-effective

I chose Gemini because it's fast and cheap, and FastMCP gave me just enough to handle that while staying aligned with MCP design patterns.

## Project Structure

```
mcp-to-do/
├── mcp-to-do-backend/          # MCP server implementation
│   ├── my_server.py            # Main MCP server
│   ├── my_client.py            # MCP client
│   └── prisma/                 # Database schema and migrations
├── mcp-to-do-frontend/         # React frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   └── App.jsx            # Main application
│   └── package.json
└── package.json               # Root dependencies
```

## Key Takeaways

What I've learned from all this goes beyond just one tool or framework. For me, this project was about finally connecting all the dots:

- **Agentic AI** gave me the vision for what's possible
- **MCP** gave me a framework to structure it
- **React** gave me the interface to bring it to life

Now I feel confident that I can take an idea — even a complex AI system — and build it out across the stack.

### From Theoretical to Practical
I went from knowing React on paper to actually building with it, debugging confidently, and understanding how to structure real-world components and apps.

### Agentic AI Made Real
I'd worked with LangChain and agents before, but MCP gave me the missing structure — how to build systems where LLMs act, reason, and use tools in a modular way.

### Understanding Client/Server Dynamics
Implementing an MCP server helped me grasp backend infrastructure more deeply. I now understand how to expose tools, handle requests, and support LLM reasoning across a flexible, scalable architecture.


## Technologies Used

- **Frontend:** React, Vite
- **Backend:** Python, FastMCP
- **Database:** SQLite with Prisma ORM
- **AI:** Google Gemini (via MCP)
- **Protocol:** Model Context Protocol (MCP)

---

*This project represents a significant milestone in my development journey, combining agentic AI, MCP, and React to create something truly practical and powerful.* 
