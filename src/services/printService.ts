/**
 * printService.ts
 * Serviço de alta precisão para impressão de documentos oficiais e relatórios
 * escolares da EEMTI Alfredo Machado em formato A4 padronizado.
 *
 * Garante:
 * 1. Isolamento absoluto (zero vazamento de cards, navbar, menus ou rodapés de fundo).
 * 2. Formatação estrita para 1 página A4 (ou 2 páginas com quebra limpa se houver provas fotográficas).
 * 3. Compatibilidade com todos os navegadores modernos (Chrome, Edge, Safari, Firefox).
 */

export function printElementById(elementId: string, docTitle: string = 'Documento Oficial — EEMTI Alfredo Machado') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Elemento com ID #${elementId} não encontrado. Executando window.print() de fallback.`);
    window.print();
    return;
  }

  printHtmlContent(element.outerHTML, docTitle);
}

export function printHtmlContent(htmlContent: string, docTitle: string = 'Documento Oficial — EEMTI Alfredo Machado') {
  // Remove qualquer iframe de impressão anterior remanescente
  const existingIframe = document.getElementById('eemti-print-frame');
  if (existingIframe && existingIframe.parentNode) {
    existingIframe.parentNode.removeChild(existingIframe);
  }

  // Cria um iframe invisível para isolamento total da folha A4
  const iframe = document.createElement('iframe');
  iframe.id = 'eemti-print-frame';
  iframe.setAttribute(
    'style',
    'position: fixed; top: -10000px; left: -10000px; width: 210mm; height: 297mm; border: none; opacity: 0; pointer-events: none; z-index: -9999;'
  );
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentWindow?.document;
  if (!iframeDoc) {
    window.print();
    return;
  }

  // Captura estilos e fontes da página principal
  let stylesHtml = '';
  document.querySelectorAll('style, link[rel="stylesheet"]').forEach((node) => {
    stylesHtml += node.outerHTML;
  });

  const fullHtml = `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${docTitle}</title>
        ${stylesHtml}
        <style>
          @page {
            size: A4 portrait;
            margin: 6mm 7mm;
          }

          *, *::before, *::after {
            box-sizing: border-box !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          html, body {
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
            font-size: 8.5pt !important;
            line-height: 1.2 !important;
            width: 100% !important;
            height: auto !important;
          }

          /* Container mestre do documento impresso */
          #printable-official-doc,
          .print-a4-wrapper {
            width: 100% !important;
            max-width: 196mm !important;
            margin: 0 auto !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #000000 !important;
            border: none !important;
            box-shadow: none !important;
          }

          /* Página principal do ofício: ajustada para caber em 1 página A4 */
          .official-oficio-page {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            width: 100% !important;
            max-height: 280mm !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-before: avoid !important;
            break-before: avoid !important;
            page-break-after: auto !important;
            break-after: auto !important;
            overflow: hidden !important;
          }

          .official-header {
            flex-shrink: 0 !important;
            margin-bottom: 1mm !important;
            padding-bottom: 1mm !important;
          }

          .official-metadata-bar {
            flex-shrink: 0 !important;
            margin-top: 1mm !important;
            margin-bottom: 1mm !important;
            padding: 1mm 2mm !important;
            font-size: 7.5pt !important;
          }

          .official-relato-box {
            max-height: 30mm !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 5 !important;
            -webkit-box-orient: vertical !important;
            line-height: 1.2 !important;
            font-size: 7.5pt !important;
          }

          .official-signatures {
            flex-shrink: 0 !important;
            margin-top: 2mm !important;
            padding-top: 2mm !important;
          }

          .official-footer {
            flex-shrink: 0 !important;
            margin-top: auto !important;
            margin-bottom: 3mm !important;
            padding-top: 1mm !important;
            font-size: 6.5pt !important;
          }

          /* Segunda página: exclusiva para provas e anexos fotográficos */
          .official-anexos-page {
            page-break-before: always !important;
            break-before: page !important;
            page-break-inside: auto !important;
            break-inside: auto !important;
            display: block !important;
            width: 100% !important;
            padding-top: 2mm !important;
          }

          .official-anexos-page img {
            max-height: 380px !important;
            width: auto !important;
            max-width: 100% !important;
            object-fit: contain !important;
            display: block !important;
            margin: 0 auto !important;
          }

          .page-break-inside-avoid {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          /* Ocultar elementos desnecessários na folha */
          .print\\:hidden,
          button,
          .no-print {
            display: none !important;
          }
        </style>
      </head>
      <body>
        <div class="print-a4-wrapper">
          ${htmlContent}
        </div>
      </body>
    </html>
  `;

  iframeDoc.open();
  iframeDoc.write(fullHtml);
  iframeDoc.close();

  // Espera que fontes e eventuais imagens carreguem antes de acionar a impressão
  const triggerPrint = () => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch (err) {
      console.error('Erro ao acionar impressão no iframe:', err);
      window.print();
    } finally {
      // Remove o iframe após a conclusão do diálogo
      setTimeout(() => {
        try {
          if (iframe.parentNode) {
            iframe.parentNode.removeChild(iframe);
          }
        } catch {}
      }, 3000);
    }
  };

  // Se houver imagens no iframe, aguarda o carregamento
  const images = iframeDoc.querySelectorAll('img');
  if (images.length > 0) {
    let loadedCount = 0;
    const totalImages = images.length;
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        setTimeout(triggerPrint, 150);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        checkAllLoaded();
      } else {
        img.onload = checkAllLoaded;
        img.onerror = checkAllLoaded;
      }
    });

    // Timeout de segurança caso alguma imagem demore a responder
    setTimeout(triggerPrint, 1200);
  } else {
    setTimeout(triggerPrint, 250);
  }
}
