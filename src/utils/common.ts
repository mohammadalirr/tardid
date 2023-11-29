export function strReplace(p1: string | RegExp, p2: string, str: string) {
  return str.replace(p1, p2);
}

export function e2p($number: string | number) {
  $number = $number.toString();
  $number = strReplace(/1/g, '۱', $number);
  $number = strReplace(/2/g, '۲', $number);
  $number = strReplace(/3/g, '۳', $number);
  $number = strReplace(/4/g, '۴', $number);
  $number = strReplace(/5/g, '۵', $number);
  $number = strReplace(/6/g, '۶', $number);
  $number = strReplace(/7/g, '۷', $number);
  $number = strReplace(/8/g, '۸', $number);
  $number = strReplace(/9/g, '۹', $number);
  $number = strReplace(/0/g, '۰', $number);
  return $number;
}
