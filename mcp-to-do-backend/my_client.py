import asyncio
from fastmcp import Client
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from google import genai
from google.genai import types
import json
import re
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from fastapi.middleware.cors import CORSMiddleware

server_params = StdioServerParameters(
    command="python",
    args=["my_server.py"], 
    env=None,
)

# FastAPI app
app = FastAPI(title="Task Management API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Pydantic model for request
class MessageRequest(BaseModel):
    message: str
# Initialize Google AI client
gemini_client = genai.Client(api_key="")

# FastAPI endpoint that accepts a string
@app.post("/api/message")
async def receive_message(request: MessageRequest):
    try:
        print(f"Received message: {request.message}")
        result = await run(request)
        return {
            "success": True,
            "response": result
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

async def run(message: MessageRequest):
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            try:

                await session.initialize()
                response = await gemini_client.aio.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=f"""
                    You are an AI assistant that manages a user's to-do list. You have access to multiple tools that allow you to read from and write to the user's task database.

                    Your job is to:
                    1. Understand the user's natural language message.
                    2. Decide which tool to call based on the user's intent.
                    3. Extract and structure the necessary parameters for that tool.
                    4. Return a JSON object that follows the tool's input schema exactly.

                    Here are the available tools you can use:

                    1. `add_task`
                    - Adds a new task to the database.
                    - Required parameters: 
                        - title (string) - Give 2 word title for the task
                        - description (string)  
                        - dueDate (string, format: YYYY-MM-DD)
                        - priority (high | medium | low)
                        - status (pending | in_progress | completed)
                        - tags (list of strings)
                    
                    2. `get_tasks`
                    - Retrieves all tasks from the database (including id).
                    - No required parameters.
                    - Format the response as a list of tasks.

                    3. `delete_task`
                    - Deletes a task from the database.
                    - Required parameters: 
                        - task (string) - The title of the task to delete
                    - Format the response as a string.

                    Here is the user's message: {message.message}

                    Return the response in markdown format.
                    """,
                    config=types.GenerateContentConfig(
                        tools=[session]
                    )
                )
                return (response.text)
            except Exception as e:
                return {
                    "success": False,
                    "message": f"Error: {str(e)}",
                    "status": "error"
                }
        
if __name__ == "__main__":
    print("Starting FastAPI Server")
    uvicorn.run(app, host="0.0.0.0", port=8000)