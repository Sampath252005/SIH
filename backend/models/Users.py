from sqlmodel import SQLModel,Field
from typing import Optional

class Users(SQLModel , table = True):
    id: Optional[int] = Field(default=None , primary_key=True)
    name: str
    email : str = Field(unique=True , index=True)
    password: Optional[str] = Field(default=None,nullable=True)
    picture: Optional[str] = Field(default=None,nullable=True)