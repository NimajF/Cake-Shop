export default function generateLink(title) {
  const separated = title.trim().split(/\s+/);
  let link = [];
  for (let name of separated) {
    link.push(name.charAt(0).toLowerCase() + name.slice(1));
  }
  return link.join("-");
}
