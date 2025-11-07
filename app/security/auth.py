from fastapi import HTTPException, Cookie

def auth_required(user_id: str = Cookie(None)):
    if not user_id:
        raise HTTPException(status_code=401, detail="Authentication required")
    return user_id
