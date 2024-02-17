"""empty message

Revision ID: 2ab0263268ff
Revises: 0e94afcba70a
Create Date: 2024-02-16 00:17:53.386696

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '2ab0263268ff'
down_revision = '0e94afcba70a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('service_products', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=80), nullable=False))
        batch_op.add_column(sa.Column('price', sa.Float(), nullable=False))

    with op.batch_alter_table('services', schema=None) as batch_op:
        batch_op.drop_column('price')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('services', schema=None) as batch_op:
        batch_op.add_column(sa.Column('price', postgresql.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=False))

    with op.batch_alter_table('service_products', schema=None) as batch_op:
        batch_op.drop_column('price')
        batch_op.drop_column('name')

    # ### end Alembic commands ###
