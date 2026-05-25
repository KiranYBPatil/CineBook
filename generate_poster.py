import os
import subprocess
import fitz

def main():
    # ─── File Paths ────────────────────────────────────
    # Look for Microsoft Edge in common installation paths
    edge_paths = [
        r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
        r'C:\Program Files\Microsoft\Edge\Application\msedge.exe'
    ]
    edge_path = next((path for path in edge_paths if os.path.exists(path)), edge_paths[0])
    
    html_path = os.path.abspath('poster.html')
    pdf_path = os.path.abspath('poster.pdf')
    png_path = os.path.abspath('poster.png')
    
    print(f"HTML Source: {html_path}")
    print(f"PDF Output: {pdf_path}")
    print(f"PNG Output: {png_path}")
    
    # Check if HTML file exists
    if not os.path.exists(html_path):
        print(f"Error: {html_path} does not exist.")
        return
        
    # Check if Microsoft Edge is installed
    if not os.path.exists(edge_path):
        print(f"Error: Microsoft Edge not found in common paths: {edge_paths}")
        return

    # ─── Step 1: Render HTML to PDF via Edge Headless ───
    print("\nStep 1: Rendering HTML to PDF via Edge headless...")
    
    cmd = [
        edge_path,
        '--headless',
        '--disable-gpu',
        '--no-margins',
        '--no-pdf-header-footer',
        f'--print-to-pdf={pdf_path}',
        html_path
    ]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        print("Edge completed successfully.")
        print(result.stderr)
    except subprocess.CalledProcessError as e:
        print(f"Error rendering PDF: {e}")
        print("Output:", e.output)
        print("Error:", e.stderr)
        return

    # ─── Step 2: Convert PDF to PNG via PyMuPDF ───────
    if os.path.exists(pdf_path):
        print("\nStep 2: Converting PDF to high-resolution PNG via PyMuPDF...")
        try:
            doc = fitz.open(pdf_path)
            if len(doc) == 0:
                print("Error: Generated PDF contains no pages.")
                return
                
            page = doc.load_page(0)
            
            # Use 300 DPI to render the 24\"x36\" poster at 7200x10800 pixels (4K/ultra-quality)
            dpi = 300
            zoom = dpi / 72  # PDF default is 72 points per inch
            mat = fitz.Matrix(zoom, zoom)
            
            pix = page.get_pixmap(matrix=mat, alpha=False)
            pix.save(png_path)
            
            print(f"PNG created successfully: {png_path}")
            print(f"Image Resolution: {pix.width} x {pix.height} pixels")
            
        except Exception as e:
            print(f"Error converting PDF to PNG: {e}")
    else:
        print("Error: PDF was not created.")

if __name__ == '__main__':
    main()
