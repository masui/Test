<?

include 'pinterest.php';

print('abc');

$p = new Pinterest_API();

$client_id = 'masui';
$client_secret = 'pobox652';
$username = 'masui';
$password = 'pobox652';

$p->fetch_access_token($client_id, $client_secret, $username, $password);

$board_id = 'Mashrooms';

$resp = $p->upload_pin(array(
    'board' => $board_id,
    'details' => 'another test',
    'image' => "@".realpath('./junk.jpg')
 ));
?>

