from fastmcp import FastMCP, Client
from prisma import Prisma
from datetime import datetime
from typing import Optional, List
import asyncio

mcp = FastMCP("db-server")
prisma = Prisma()

@mcp.tool
async def add_task(task: str, description: str, dueDate: str, priority: str, status: str, tags: List[str], attachments: List[str], comments: List[str]):
    try:
        # Ensure Prisma is connected
        await prisma.connect()
        result = await prisma.task.create(
            data={
                "title": task,
                "description": description,
                "dueDate": datetime.strptime(dueDate, "%Y-%m-%d"),
                "priority": priority,
                "status": status,
                "tags": tags,
                "attachments": attachments,
                "comments": comments,
            }
        )
        return result
    except Exception as e:
        return {"error": str(e)}
    finally:
        await prisma.disconnect()

@mcp.tool
async def get_tasks():
    try:
        await prisma.connect()
        tasks = await prisma.task.find_many()
        return tasks
    except Exception as e:
        return {"error": str(e)}
    finally:
        await prisma.disconnect()


@mcp.tool
async def delete_task(task: str):
    try:
        await prisma.connect()
        task_to_delete = await prisma.task.find_first(where={"title": task})
        if task_to_delete:
            await prisma.task.delete(where={"id": task_to_delete.id})
        return {"message": "Task deleted successfully"}
    except Exception as e:
        return {"error": str(e)}
    finally:
        await prisma.disconnect()

if __name__ == "__main__":
    print("Starting MCP Server")
    mcp.run()