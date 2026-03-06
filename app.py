from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os
import smtplib
from email.mime.text import MIMEText
import ssl
from datetime import datetime

app = Flask(__name__)
CORS(app)


# Configuración de Supabase (Variables de entorno)
SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "")
HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

EMAIL_CONFIG = {
    "sender": os.environ.get("EMAIL_SENDER", ""),
    "password": os.environ.get("EMAIL_PASSWORD", ""),
    "recipient": os.environ.get("EMAIL_RECIPIENT", ""),
    "smtp_server": "smtp.gmail.com",
    "smtp_port": 465
}

def send_email(name, email, project_type, message):
    try:
        msg = MIMEText(f"Nuevo mensaje de contacto\n\nNombre: {name}\nEmail: {email}\nTipo de Proyecto: {project_type}\nMensaje:\n{message}", "plain", "utf-8")
        msg["Subject"] = f"Nuevo mensaje de portafolio: {project_type}"
        msg["From"] = EMAIL_CONFIG["sender"]
        msg["To"] = EMAIL_CONFIG["recipient"]

        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(EMAIL_CONFIG["smtp_server"], EMAIL_CONFIG["smtp_port"], context=context) as server:
            server.login(EMAIL_CONFIG["sender"], EMAIL_CONFIG["password"])
            server.sendmail(EMAIL_CONFIG["sender"], EMAIL_CONFIG["recipient"], msg.as_string())
        
        print(f"Email enviado exitosamente a {EMAIL_CONFIG['recipient']}")
        return True
    except Exception as e:
        print(f"Error al enviar email: {e}")
        return False

@app.route('/api/contact', methods=['POST'])
def contact():
    """Endpoint para recibir los datos del formulario de contacto."""
    try:
        data = request.json
        name = data.get('name')
        email = data.get('email')
        project_type = data.get('type')
        message_text = data.get('message')

        if not all([name, email, project_type, message_text]):
            return jsonify({'error': 'Todos los campos son obligatorios.'}), 400

        # Guardar en Supabase
        payload = {
            "name": name,
            "email": email,
            "project_type": project_type,
            "message": message_text,
            "created_at": datetime.now().isoformat()
        }
        
        response = requests.post(
            f"{SUPABASE_URL}/rest/v1/messages",
            headers=HEADERS,
            json=payload
        )

        if response.status_code not in [200, 201]:
            print(f"Error de Supabase: {response.text}")
            return jsonify({'error': 'Error al guardar en la base de datos'}), 500

        # Intentar enviar correo
        send_email(name, email, project_type, message_text)

        print(f"Nuevo mensaje guardado en Supabase de: {name} ({email})")
        
        return jsonify({'success': '¡Mensaje guardado correctamente!'}), 201

    except Exception as e:
        print(f"Error al guardar el mensaje: {e}")
        return jsonify({'error': 'Error interno del servidor al procesar tu solicitud.'}), 500

@app.route('/api/messages', methods=['GET'])
def get_messages():
    """Endpoint protegido con token."""
    token = request.args.get('token')
    if token != "admin123":
        return jsonify({'error': 'No autorizado'}), 401
    
    try:
        response = requests.get(
            f"{SUPABASE_URL}/rest/v1/messages?order=created_at.desc",
            headers=HEADERS
        )
        
        if response.status_code == 200:
            return jsonify(response.json()), 200
        else:
            return jsonify({'error': 'Error al obtener mensajes'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.route('/')
def serve_index():
    return send_from_directory(BASE_DIR, 'index.html')

@app.route('/admin')
def serve_admin():
    return send_from_directory(BASE_DIR, 'admin_dashboard.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(BASE_DIR, filename)

if __name__ == '__main__':
    print("Servidor listo. Conectado a Supabase.")
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)


