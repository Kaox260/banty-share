import base64
from itertools import permutations, product
import string

# Informations de l'étudiant
fixed_parts = [
    "TAHIR",
    "Aiman",
    "BTS1A",
    "SIO1",
    "Classe 1 SIO",
    "Apprentissage",
    "Motif personnel / familial",
    "du 18/02/2025 au 18/02/2025",
    "de 09:45:00 à 11:30:00",
]

# Token attendu
target_token = "NEFvUVhsNWhiUStpblh2Snh4WDVydz09"

# Caractères possibles pour la génération
dynamic_chars = string.ascii_letters + string.digits + string.punctuation + " "

# Fonction de recherche exhaustive
def find_matching_string():
    current_test = ""
    found_parts = []
    
    while len(base64.b64encode(current_test.encode()).decode()) < len(target_token):
        for part in fixed_parts + list(dynamic_chars):
            test_string = current_test + part
            encoded = base64.b64encode(test_string.encode()).decode()
            
            if encoded[:len(target_token)] == target_token[:len(encoded)]:
                found_parts.append(part)
                current_test = test_string
                print(f"Match trouvé: {part}")
                break
        else:
            print("Aucune correspondance supplémentaire trouvée.")
            break
    
    print("Chaîne finale trouvée:", "".join(found_parts))
    print(encoded)

find_matching_string()