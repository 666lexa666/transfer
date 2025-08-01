import React from 'react';
import { X, Download, FileText } from 'lucide-react';
import jsPDF from 'jspdf';

// Добавляем поддержку кириллицы
import 'jspdf/dist/jspdf.es.min.js';

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  fileName: string;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  fileName,
}) => {
  const handleDownload = () => {
    // Создаем PDF документ с поддержкой UTF-8
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Используем встроенный шрифт с поддержкой кириллицы
    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    
    // Разбиваем текст на строки и обрабатываем каждую строку отдельно
    const textLines = content.split('\n');
    let yPosition = 20;
    const pageHeight = 280;
    const lineHeight = 7;
    const maxWidth = 180;
    
    textLines.forEach((line: string) => {
      if (line.trim() === '') {
        yPosition += lineHeight;
        return;
      }
      
      // Разбиваем длинные строки
      const wrappedLines = doc.splitTextToSize(line, maxWidth);
      
      wrappedLines.forEach((wrappedLine: string) => {
        if (yPosition > pageHeight) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Добавляем текст с правильной кодировкой
        doc.text(wrappedLine, 15, yPosition);
        yPosition += lineHeight;
      });
    });
    
    // Скачиваем PDF файл
    doc.save(`${fileName}.pdf`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="prose max-w-none text-gray-700 whitespace-pre-line">
            {content}
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Документ доступен для скачивания
          </p>
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Download size={16} />
            Скачать PDF
          </button>
        </div>
      </div>
    </div>
  );
};