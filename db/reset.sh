user="root"
pass="N7P8R3xfZmK7uX"

mysql -u $user -p"$pass" < create.sql
mysql -u $user -p"$pass" < import.sql
