user="root"
pass=""

mysql -u $user -p"$pass" < create.sql
mysql -u $user -p"$pass" < import.sql
