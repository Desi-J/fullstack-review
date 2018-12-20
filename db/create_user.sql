insert into users (name, email, picture, auth0_id)
values ($1, $2, $3, $4)
returning * ;
-- if we dont do retirnung * we do not get a value back