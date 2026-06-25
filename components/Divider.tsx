// Hairline section divider — the `.wrap > .divider` pair used between homepage
// sections. Extracted so the markup isn't repeated inline six times in page.tsx;
// output is byte-identical to the previous inline version.
export default function Divider() {
  return (
    <div className="wrap">
      <div className="divider" />
    </div>
  );
}
