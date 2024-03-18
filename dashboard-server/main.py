import asyncio
from typing import NoReturn
from Core.server import run_server


async def main() -> NoReturn:
    await run_server()

if __name__ == '__main__':
    asyncio.run(main())
    