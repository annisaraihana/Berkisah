from fastapi import APIRouter
import pgsql_model.models as model
router = APIRouter()


@router.post("/api/register")
async def register(username: str, password: str):
    db_user = model.User(username=username, password=password)
    return {
        "success": True
    }