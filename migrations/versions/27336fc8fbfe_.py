"""empty message

Revision ID: 27336fc8fbfe
Revises: 
Create Date: 2022-07-14 13:31:08.141451

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '27336fc8fbfe'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=128), nullable=False),
    sa.Column('start_date', sa.DateTime(), nullable=True),
    sa.Column('end_date', sa.DateTime(), nullable=True),
    sa.Column('description', sa.String(length=1028), nullable=False),
    sa.Column('venue', sa.String(length=128), nullable=False),
    sa.Column('flyer', sa.String(length=225), nullable=True),
    sa.Column('website', sa.String(length=225), nullable=False),
    sa.Column('status', sa.String(length=15), nullable=True),
    sa.Column('uid', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=64), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.Column('profile_photo', sa.String(length=255), nullable=True),
    sa.Column('role', sa.String(length=15), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')
    op.drop_table('events')
    # ### end Alembic commands ###
