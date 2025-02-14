export default function (address : string){
  let st = address.slice(0,7);
  st += '....'
  return st;
}