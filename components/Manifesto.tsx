export default function Manifesto() {
  return (
    <section className="manifesto">
      <div className="wrap">
        {/* Line breaks are responsive: br-d drives the desktop layout (4 lines,
            unchanged), br-m drives the mobile layout (7 lines). mobile.css
            toggles which set is visible — see the `.manifesto br.*` rules. */}
        <p data-split>
          Setiap acara{" "}
          <br className="br-m" />
          punya cerita.
          <br className="br-d" />
          <br className="br-m" />
          Tugas kami sederhana:{" "}
          <br className="br-m" />
          memberi tamu
          <br className="br-d" />
          <br className="br-m" />
          sesuatu untuk <span className="it">dipegang</span>,{" "}
          <br className="br-m" />
          dan{" "}
          <br className="br-d" />
          kamu hal abadi{" "}
          <br className="br-m" />
          untuk <span className="it">dikenang</span>.
        </p>
      </div>
    </section>
  );
}
