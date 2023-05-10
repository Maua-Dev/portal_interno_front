import styles from "./time_log.module.css";

export default function TimeLog() {
  return (
    <>
      <main className={styles.page}>
        <header className={styles.header}>
          <div className={styles.content}>
            <h1>IMG</h1>
            <div>
              <p>LUCAS FERNANDES (UX/UI)</p>
              <p>1 ANO / DESIGN</p>
              <p>tarefas em andamento</p>
            </div>
            <button>editar</button>
          </div>
          <div className={styles.hours}>
            <p>Horas totais</p>
            <span>00:00</span>
          </div>
        </header>
        <section className={styles.projects}>
          <aside>
            <h2>Projetos</h2>
            <h2>Histórico</h2>
          </aside>
          <article>Projeto 1</article>
        </section>
      </main>
    </>
  );
}
