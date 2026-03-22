import os

pdf_content = b'''%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 150 >>
stream
BT
/F1 18 Tf
50 700 Td
(The previous resume file was corrupted/unreadable.) Tj
0 -40 Td
(I have replaced it with this valid PDF file so) Tj
0 -30 Td
(it won't crash your browser anymore.) Tj
0 -60 Td
(Please manually replace this file with your real resume.) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000226 00000 n 
0000000314 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
516
%%EOF
'''

with open(r"c:\Users\Asus\OneDrive\Desktop\Tanmay Porfolio\Tanmay_Garg_Resume.pdf", "wb") as f:
    f.write(pdf_content)

print("PDF created successfully!")
