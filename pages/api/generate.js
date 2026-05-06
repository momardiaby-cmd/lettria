export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { poste, entreprise, secteur, experience, etudes, competences, realisation } = req.body

  const prompt = `Tu es un expert en rédaction de lettres de motivation professionnelles françaises.
Génère une lettre de motivation complète, professionnelle et personnalisée pour :
- Poste : ${poste}
- Entreprise : ${entreprise || 'non précisée'}
- Secteur : ${secteur || 'non précisé'}
- Expérience : ${experience}
- Niveau d'études : ${etudes}
- Compétences : ${competences || 'non précisées'}
- Réalisation notable : ${realisation || 'aucune précisée'}

La lettre doit :
- Commencer par "Madame, Monsieur,"
- Faire 3-4 paragraphes bien structurés
- Être chaleureuse, dynamique et convaincante
- Se terminer par une formule de politesse complète
- Faire entre 250 et 350 mots
- Être en français impeccable

Réponds UNIQUEMENT avec le texte de la lettre, sans introduction ni commentaire.`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    )
    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Erreur de génération'
    res.status(200).json({ letter: text })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}