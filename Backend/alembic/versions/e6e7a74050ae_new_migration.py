"""New Migration

Revision ID: e6e7a74050ae
Revises: cbbde2f4736b
Create Date: 2023-06-03 11:07:09.474065

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e6e7a74050ae'
down_revision = 'cbbde2f4736b'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('story',
    sa.Column('id_story', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('prompt', sa.String(), nullable=True),
    sa.Column('image', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id_story')
    )
    op.create_table('user',
    sa.Column('id_user', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=True),
    sa.Column('password', sa.String(), nullable=True),
    sa.Column('token', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id_user')
    )
    op.create_table('saved_story_progress',
    sa.Column('id_progress', sa.Integer(), nullable=False),
    sa.Column('id_user', sa.Integer(), nullable=True),
    sa.Column('id_story', sa.Integer(), nullable=True),
    sa.Column('progress', sa.JSON(), nullable=True),
    sa.ForeignKeyConstraint(['id_story'], ['story.id_story'], ),
    sa.ForeignKeyConstraint(['id_user'], ['user.id_user'], ),
    sa.PrimaryKeyConstraint('id_progress')
    )
    op.create_table('user_config',
    sa.Column('id_config', sa.Integer(), nullable=False),
    sa.Column('id_user', sa.Integer(), nullable=True),
    sa.Column('text_model', sa.String(), nullable=True),
    sa.Column('image_model', sa.String(), nullable=True),
    sa.Column('image_artstyle', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['id_user'], ['user.id_user'], ),
    sa.PrimaryKeyConstraint('id_config')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_config')
    op.drop_table('saved_story_progress')
    op.drop_table('user')
    op.drop_table('story')
    # ### end Alembic commands ###
