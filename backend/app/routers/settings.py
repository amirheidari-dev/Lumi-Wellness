from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth import get_current_user, require_roles
from app.database import get_db
from app.models import ClubSettings, User
from app.responses import success_response
from app.schemas import ClubSettingsResponse, ClubSettingsUpdate

router = APIRouter(prefix="/api/v1/settings", tags=["Settings"])


def _get_or_create_settings(db: Session) -> ClubSettings:
    row = db.query(ClubSettings).filter(ClubSettings.id == "default").first()
    if not row:
        row = ClubSettings(id="default")
        db.add(row)
        db.commit()
        db.refresh(row)
    return row


@router.get("")
def get_club_settings(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    row = _get_or_create_settings(db)
    return success_response(
        data=ClubSettingsResponse.model_validate(row).model_dump(by_alias=True)
    )


@router.put("")
def update_club_settings(
    req: ClubSettingsUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin")),
):
    row = _get_or_create_settings(db)
    update_data = req.model_dump(exclude_unset=True, by_alias=False)
    for key, value in update_data.items():
        if value is not None:
            setattr(row, key, value)
    db.commit()
    db.refresh(row)
    return success_response(
        data=ClubSettingsResponse.model_validate(row).model_dump(by_alias=True),
        message="Settings updated",
    )
