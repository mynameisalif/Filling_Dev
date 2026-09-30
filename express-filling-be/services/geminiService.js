import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const getMimeType = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  return 'image/jpeg';
};

/**
 * Menganalisis gambar bukti transfer menggunakan Google Gemini Vision AI
 * @param {Object} params
 * @param {string} params.imagePath - Path file lokal gambar bukti pembayaran
 * @param {number} params.expectedAmount - Nominal harga workshop yang harus dibayar
 * @param {string} params.workshopName - Nama workshop
 * @param {string} params.participantName - Nama peserta
 * @returns {Promise<Object>} Hasil ekstraksi data dan rekomendasi validasi
 */
export const analyzePaymentReceipt = async ({
  imagePath,
  expectedAmount,
  workshopName,
  participantName,
}) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY belum dikonfigurasi di file .env backend.');
  }

  if (!fs.existsSync(imagePath)) {
    throw new Error(`File bukti pembayaran tidak ditemukan di path: ${imagePath}`);
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const fileBuffer = fs.readFileSync(imagePath);
  const base64Data = fileBuffer.toString('base64');
  const mimeType = getMimeType(imagePath);

  const prompt = `
Kamu adalah asisten AI Auditor Finansial cerdas yang bertugas memvalidasi bukti transfer pembayaran workshop/seminar.
Analisis gambar bukti transfer ini secara teliti dan objektif.

Data Transaksi yang Diharapkan:
- Nama Workshop: "${workshopName || 'Workshop'}"
- Total Tagihan / Harga Workshop: Rp ${Number(expectedAmount || 0).toLocaleString('id-ID')} (${expectedAmount || 0})
- Nama Peserta Terdaftar: "${participantName || 'Peserta'}"

Instruksi Analisis:
1. Periksa apakah gambar ini benar-benar bukti transfer bank, resi ATM, mutasi m-banking, atau e-wallet (BCA, Mandiri, BRI, BNI, BSI, GoPay, OVO, Dana, ShopeePay, QRIS, dll).
2. Baca nominal transfer yang tertera pada bukti transfer (angka murni tanpa titik/koma/simbol).
3. Bandingkan nominal yang ditransfer dengan harga workshop yang diharapkan.
4. Identifikasi bank/platform pengirim dan penerima, nama pengirim, nomor referensi/transaksi, serta waktu transaksi jika terbaca.
5. Periksa apakah ada indikasi editan/manipulasi gambar mencurigakan.
6. Berikan skor keyakinan (confidence_score) dari 0 hingga 100.
7. Tentukan rekomendasi:
   - "APPROVE": Jika bukti pembayaran sah, nominal sesuai atau lebih, dan terlihat asli.
   - "REJECT": Jika bukan bukti transfer, nominal kurang dari tagihan, atau jelas palsu.
   - "MANUAL_CHECK": Jika gambar buram, nominal tidak terbaca jelas, atau perlu pengecekan langsung oleh admin.

Format Jawaban:
Kembalikan HANYA format JSON valid tanpa format markdown (tanpa \`\`\`json atau \`\`\`), dengan format persis seperti ini:
{
  "is_valid_receipt": true,
  "bank_or_platform": "Nama Bank atau E-Wallet",
  "sender_name": "Nama Pengirim (atau 'Tidak Terbaca')",
  "recipient_name": "Nama Penerima (atau 'Tidak Terbaca')",
  "detected_amount": 100000,
  "expected_amount": 100000,
  "is_amount_matching": true,
  "transaction_date": "Tanggal & jam transaksi jika ada",
  "reference_number": "Nomor transaksi/referensi jika ada",
  "confidence_score": 95,
  "analysis_summary": "Ringkasan analisis 1-2 kalimat bahasa Indonesia untuk admin.",
  "recommendation": "APPROVE"
}
`;

  // Model yang aktif di Google GenAI SDK (gemini-3.1-flash-lite, gemini-3.8-flash, gemini-3.5-flash-lite)
  const models = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-3.5-flash-lite'];

  let lastError = null;
  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  data: base64Data,
                  mimeType,
                },
              },
              {
                text: prompt,
              },
            ],
          },
        ],
      });

      const text = response.text || '';
      const cleanJson = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsedData = JSON.parse(cleanJson);

      return {
        success: true,
        model_used: model,
        data: parsedData,
      };
    } catch (err) {
      lastError = err;
      console.warn(`[Gemini AI] Model ${model} gagal atau sibuk, mencoba model berikutnya...`, err.message);
    }
  }

  throw new Error(`Gagal menganalisis gambar dengan Gemini AI: ${lastError?.message || 'Unknown error'}`);
};
