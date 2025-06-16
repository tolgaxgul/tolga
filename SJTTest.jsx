import React, { useState } from 'react';

const questions = [
  {
    question: "Ekip arkadaşın teslim tarihini kaçırdı. Ne yaparsın?",
    options: {
      A: { text: "Sebebini sorarım.", trait: "Uyumluluk" },
      B: { text: "Eleştiririm.", trait: "Dışadönüklük" },
      C: { text: "Sessiz kalırım.", trait: "Nevrotiklik" },
      D: { text: "Yöneticiyi bilgilendiririm.", trait: "Sorumluluk" },
    },
  },
  {
    question: "Müşteri sinirli. Ne yaparsın?",
    options: {
      A: { text: "Çözüm sunarım.", trait: "Uyumluluk" },
      B: { text: "Kuralları hatırlatırım.", trait: "Sorumluluk" },
      C: { text: "Bir şey yapmam.", trait: "Nevrotiklik" },
      D: { text: "Sert yanıt veririm.", trait: "Düşük Uyumluluk" },
    },
  },
  {
    question: "Toplantıda herkes suskun. Ne yaparsın?",
    options: {
      A: { text: "Fikir söylerim.", trait: "Dışadönüklük" },
      B: { text: "Katkı sunarım.", trait: "Uyumluluk" },
      C: { text: "Beklerim.", trait: "Nevrotiklik" },
      D: { text: "Sorulunca konuşurum.", trait: "Sorumluluk" },
    },
  },
  {
    question: "Yeni görev verildi. Ne yaparsın?",
    options: {
      A: { text: "Yardım ederim.", trait: "Uyumluluk" },
      B: { text: "Kendi işimi bitiririm.", trait: "Sorumluluk" },
      C: { text: "Reddederim.", trait: "Düşük Uyumluluk" },
      D: { text: "Görmezden gelirim.", trait: "Nevrotiklik" },
    },
  },
  {
    question: "Ekipte tartışma var. Ne yaparsın?",
    options: {
      A: { text: "Arabuluculuk yaparım.", trait: "Uyumluluk" },
      B: { text: "Sunuma odaklanırım.", trait: "Sorumluluk" },
      C: { text: "Yöneticiyi bilgilendiririm.", trait: "Nevrotiklik" },
      D: { text: "Taraf olurum.", trait: "Dışadönüklük" },
    },
  },
];

export default function App() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const traits = ["Dışadönüklük", "Uyumluluk", "Nevrotiklik", "Sorumluluk"];
  const scores = traits.reduce((acc, trait) => {
    acc[trait] = Object.values(answers).filter((t) => t === trait).length;
    return acc;
  }, {});

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: 20 }}>
      <h1>SJT Kişilik Testi</h1>
      {questions.map((q, idx) => (
        <div key={idx} style={{ marginBottom: 20, padding: 10, border: '1px solid #ccc' }}>
          <p><strong>{q.question}</strong></p>
          {Object.entries(q.options).map(([key, { text, trait }]) => (
            <div key={key}>
              <label>
                <input
                  type="radio"
                  name={`q${idx}`}
                  value={key}
                  checked={answers[idx] === trait || (trait === "Düşük Uyumluluk" && answers[idx] === null)}
                  onChange={() =>
                    setAnswers({ ...answers, [idx]: trait === "Düşük Uyumluluk" ? null : trait })
                  }
                />
                {` ${key}) ${text}`}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={() => setSubmitted(true)}>Sonucu Göster</button>

      {submitted && (
        <div style={{ marginTop: 20 }}>
          <h2>Sonuçlar</h2>
          {traits.map((trait) => (
            <p key={trait}>{trait}: {scores[trait]} puan</p>
          ))}
        </div>
      )}
    </div>
  );
}
