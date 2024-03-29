"""empty message

Revision ID: cfb75781b0b5
Revises: 38ce164bb685
Create Date: 2024-03-01 15:19:39.849433

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'cfb75781b0b5'
down_revision = '38ce164bb685'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.drop_column('rating')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.add_column(sa.Column('rating', postgresql.ENUM('ONE_STAR', 'TWO_STARS', 'THREE_STARS', 'FOUR_STARS', 'FIVE_STARS', name='ratingenum'), autoincrement=False, nullable=False))

    # ### end Alembic commands ###
