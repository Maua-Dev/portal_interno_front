import styles from "./time_log.module.css";

export default function TimeLog() {
  return (
    <>
      <main className={styles.page}>
        <header className={styles.header}>
          <div className={styles.content}>
            <h1>IMG</h1>
            <div>
              <h2>LUCAS FERNANDES (UX/UI)</h2>
              <h3>1º ANO / DESIGN</h3>
              <p>tarefas em andamento</p>
            </div>
            <button>Editar</button>
          </div>
          <div className={styles.hours}>
            <h2>Horas totais</h2>
            <span>00:00</span>
          </div>
        </header>

        <section className={styles.body}>
          <aside className={styles.widgets}>
            <div>
              <h2>Projetos</h2>
              <button>\/</button>
            </div>
            <div>
              <h2>Histórico</h2>
              <button>\/</button>
            </div>
          </aside>
          <article className={styles.container}>
            <div>
              <h2>PROJETO 1</h2>
              <p>Início: 15/05/2023</p>
              <p>PO / Scrum Master</p>
              <button>Ver membros</button>
            </div>
            <div className={styles.project}>
              <div className={styles.activities}>
                <h3>ATIVIDADES</h3>
                <span className={styles["activities-status"]}>Pendentes</span>
                <div>
                  <h4>TÍTULO</h4>
                  <p>Área da atividade</p>
                  <span>Início 28/10/2023</span>
                  <button>administrar</button>
                </div>
                <div>
                  <h4>TÍTULO</h4>
                  <p>Área da atividade</p>
                  <span>Início 28/10/2023</span>
                  <button>administrar</button>
                </div>
              </div>
              <div className={styles.activities}>
                <h3>ATIVIDADES</h3>
                <span className={styles["activities-status"]}>Concluídos</span>
                <div>
                  <h4>TÍTULO</h4>
                  <p>Área da atividade</p>
                  <span>Início 28/10/2023</span>
                  <button>administrar</button>
                </div>
                <div>
                  <h4>TÍTULO</h4>
                  <p>Área da atividade</p>
                  <span>Início 28/10/2023</span>
                  <button>administrar</button>
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
