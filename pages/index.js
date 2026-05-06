import { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [form, setForm] = useState({
    poste: '', entreprise: '', secteur: '',
    experience: 'Débutant (0-1 an)', etudes: 'Bac+3 / Licence',
    competences: '', realisation: ''
  })
  const [letter, setLetter] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [usageCount, setUsageCount] = useState(0)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const generer = async () => {
    if (!form.poste) { setError('Indique le poste visé'); return }
    if (usageCount >= 1) { setError('Limite gratuite atteinte. Passe à LettriA Pro pour continuer.'); return }

    setLoading(true)
    setError('')
    setLetter('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setLetter(data.letter)
      setUsageCount(c => c + 1)
    } catch (e) {
      setError('Erreur : ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  const copier = () => {
    navigator.clipboard.writeText(letter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Lettr<span className={styles.accent}>IA</span> <span className={styles.badge}>1 gratuite</span></h1>
          <p>Génère une lettre de motivation professionnelle en 10 secondes</p>
        </header>

        <div className={styles.card}>
          <p className={styles.sectionTitle}>Le poste</p>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label>Poste visé *</label>
              <input value={form.poste} onChange={e => set('poste', e.target.value)} placeholder="ex: Développeur web" />
            </div>
            <div className={styles.field}>
              <label>Entreprise</label>
              <input value={form.entreprise} onChange={e => set('entreprise', e.target.value)} placeholder="ex: Google France" />
            </div>
          </div>
          <div className={styles.field}>
            <label>Secteur d'activité</label>
            <select value={form.secteur} onChange={e => set('secteur', e.target.value)}>
              <option value="">Sélectionner...</option>
              <option>Technologie / Informatique</option>
              <option>Finance / Banque</option>
              <option>Marketing / Communication</option>
              <option>Commerce / Vente</option>
              <option>Santé / Médical</option>
              <option>Éducation / Formation</option>
              <option>Ingénierie / Industrie</option>
              <option>Autre</option>
            </select>
          </div>
        </div>

        <div className={styles.card}>
          <p className={styles.sectionTitle}>Ton profil</p>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label>Expérience</label>
              <select value={form.experience} onChange={e => set('experience', e.target.value)}>
                <option>Débutant (0-1 an)</option>
                <option>Junior (1-3 ans)</option>
                <option>Confirmé (3-7 ans)</option>
                <option>Senior (7+ ans)</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Niveau d'études</label>
              <select value={form.etudes} onChange={e => set('etudes', e.target.value)}>
                <option>Bac</option>
                <option>Bac+2</option>
                <option>Bac+3 / Licence</option>
                <option>Bac+5 / Master</option>
                <option>Doctorat</option>
              </select>
            </div>
          </div>
          <div className={styles.field}>
            <label>Compétences clés <span className={styles.hint}>(séparées par des virgules)</span></label>
            <input value={form.competences} onChange={e => set('competences', e.target.value)} placeholder="ex: JavaScript, gestion de projet, anglais courant" />
          </div>
          <div className={styles.field}>
            <label>Ta plus grande réalisation <span className={styles.hint}>(optionnel)</span></label>
            <textarea value={form.realisation} onChange={e => set('realisation', e.target.value)} placeholder="ex: J'ai augmenté les ventes de 30% en 6 mois..." />
          </div>
        </div>

        <button className={styles.btnGenerate} onClick={generer} disabled={loading}>
          {loading ? 'Rédaction en cours...' : '✦ Générer ma lettre'}
        </button>

        {error && <div className={styles.error}>{error}</div>}

        {letter && (
          <div className={styles.resultCard}>
            <div className={styles.resultHeader}>
              <span>✓ Lettre générée</span>
              <button className={styles.btnCopy} onClick={copier}>
                {copied ? '✓ Copié !' : '⎘ Copier'}
              </button>
            </div>
            <pre className={styles.letterText}>{letter}</pre>
            <button className={styles.btnRegen} onClick={generer}>↺ Régénérer</button>
          </div>
        )}

        <footer className={styles.footer}>
          <p>LettriA · 1 lettre gratuite · Pro à 9€/mois</p>
        </footer>
      </div>
    </div>
  )
}
