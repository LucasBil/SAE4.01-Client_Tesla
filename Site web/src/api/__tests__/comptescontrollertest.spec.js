import { describe, it, expect, assert } from 'vitest';
import { vi } from 'vitest'
import ComptesController from "@/api/ComptesController";
import { ref } from "vue";



describe('GetAllComptes', () => {
  it('GetAllComptesOK', async () => {
    let comptes;

    let comptesToCompare = [
        {
            "idCompte": 89,
            "idDepartement": null,
            "email": 'lucasbill318@icloud.com',
            "typeCompte": 'personnel',
            "nomCompte": 'Lucas',
            "prenomCompte": 'Billy',
            "motDePasse": 'e8ec37bfe4e818cc1bb10d1564e1ed7666f75251649ed8606f910306e8b17e00148187bd8ccaf6d683069b550247aa52dd7e9d5460e408df11db9109dafdd087',
            "numeroTelephone": null,
            "numeroRue": null,
            "nomRue": null,
            "ville": null,
            "codepostal": null,
            "nomEntreprise": null,
            "derniereConnexion": null,
            "dataCollect": false,
            "numTVA": null,
            "departementNavigation": null,
            "sepaNavigation": null,
            "cbNavigation": null,
            "cvtNavigation": null,
            "commAccessoireNavigation": null
        },
        
        {
            "idCompte": 94,
            "idDepartement": null,
            "email": 'jythestin@gmail.com',
            "typeCompte": 'personnel',
            "nomCompte": 'LEICHTMANN',
            "prenomCompte": 'Jimmy',
            "motDePasse": 'b901a9d1ce930082d472aac646a620fab499e0a9beb4373473e26f1d88db1f2103842122d29b82d819acdca66077e03c061b4d0f078c2d99653b3c2b76bde138',
            "numeroTelephone": null,
            "numeroRue": null,
            "nomRue": null,
            "ville": null,
            "codepostal": null,
            "nomEntreprise": null,
            "derniereConnexion": null,
            "dataCollect": false,
            "numTVA": null,
            "departementNavigation": null,
            "sepaNavigation": null,
            "cbNavigation": null,
            "cvtNavigation": null,
            "commAccessoireNavigation": null
        }, 
        
        {
            "idCompte": 97,
            "idDepartement": null,
            "email": 'adlencherif@gmail.com',
            "typeCompte": 'personnel',
            "nomCompte": 'Chérif',
            "prenomCompte": 'Adlen',
            "motDePasse": 'd881b594bde5ff542f2b8db405e1b46dbdde25609e71039abfc3fbcebc93d4f4160e2c1ca2bc5f811da86899755048d2fb8038ded4c228376959d723a26a3bb2',
            "numeroTelephone": '+33 7 90 35 21 45',
            "numeroRue": 1,
            "nomRue": 'route de la déquindance',
            "ville": 'Madrid',
            "codepostal": '56100',
            "nomEntreprise": null,
            "derniereConnexion": null,
            "dataCollect": false,
            "numTVA": null,
            "departementNavigation": null,
            "sepaNavigation": null,
            "cbNavigation": null,
            "cvtNavigation": null,
            "commAccessoireNavigation": null
        }
    ];

    await ComptesController.GetAll()
            .then((response) => {
                comptes = response.data;
            })
            
            comptes = comptes.slice(0,3)

            console.log(comptes)
            console.log(comptesToCompare)

            expect(comptes).toStrictEqual(comptesToCompare);
    });

    it('GetByIdCompteOK', async () => {
        let compte;
    
        let compteToCompare = 
            {
                "idCompte": 89,
                "idDepartement": null,
                "email": 'lucasbill318@icloud.com',
                "typeCompte": 'personnel',
                "nomCompte": 'Lucas',
                "prenomCompte": 'Billy',
                "motDePasse": 'e8ec37bfe4e818cc1bb10d1564e1ed7666f75251649ed8606f910306e8b17e00148187bd8ccaf6d683069b550247aa52dd7e9d5460e408df11db9109dafdd087',
                "numeroTelephone": null,
                "numeroRue": null,
                "nomRue": null,
                "ville": null,
                "codepostal": null,
                "nomEntreprise": null,
                "derniereConnexion": null,
                "dataCollect": false,
                "numTVA": null,
                "departementNavigation": null,
                "sepaNavigation": null,
                "cbNavigation": null,
                "cvtNavigation": null,
                "commAccessoireNavigation": null
            }
    
        await ComptesController.GetById(89)
                .then((response) => {
                    compte = response.data;
                })
                
    
                console.log(compte)
                console.log(compteToCompare)
    
                expect(compte).toStrictEqual(compteToCompare);
        });
});
