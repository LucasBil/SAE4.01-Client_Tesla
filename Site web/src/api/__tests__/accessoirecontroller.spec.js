import { describe, it, expect, assert, beforeEach, afterEach } from 'vitest';
import { vi } from 'vitest'
import AccesssoiresController from "@/api/AccessoireController";
import { ref } from "vue";
import { shallowMount} from '@vue/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { data } from 'autoprefixer';

vi.mock('axios')

describe('AccesssoiresControllerTests', () => {
    beforeEach(() => {
        axios.get.mockReset()
      })
    
    // GET ALL MODELES
    it('GetAllAccesssoiresOK', async () => {

    let accesssoiresToCompare = [
        {
          "idAccessoire": 1,
          "nomAccessoire": "Wall Connector",
          "prix": 500,
          "description": "Le Wall Connector est notre solution de recharge la plus pratique pour les véhicules électriques Tesla et non-Tesla. Sa conception légère assure une installation polyvalente en intérieur ou en extérieur et adaptée à une multitude de systèmes électriques. Il est conçu pour les maisons, les appartements, les établissements hôteliers et les lieux de travail.Fonctionnalités:Compatible avec tous les VE dotés d'un port de recharge de type 2Connectivité Wi-Fi pour les mises à jour du micrologiciel à distanceJusqu'à 71 km d'autonomie par heureJusqu'à 22 kW avec des réseaux électriques triphasésPartage de puissance pour prendre en charge plusieurs Wall ConnectorsInstallation facile sur les réseaux monophasés ou triphasésOuverture du port de recharge Tesla à partir du connecteurOption permettant de définir le courant maximal pendant l'installation",
          "categoriesNavigation": [],
          "caracteristiquesNavigation": [],
          "variantesNavigation": null
        },
        {
          "idAccessoire": 2,
          "nomAccessoire": "Socle pour Wall Connector",
          "prix": 472,
          "description": "Le socle pour Wall Connector est un montant en aluminium robuste, conçu pour le montage de Wall Connectors de 2e et 3e génération afin d'assurer une recharge autonome. Avec des options d'installation faciles, tant à l'intérieur qu'à l'extérieur, le socle pour Wall Connector est idéal pour toute entrée, propriété ou tout parking qui nécessitent une structure autonome afin de supporter l'équipement de recharge. Le socle pour Wall Connector prend en charge les configurations de montage simple et double, qui permettent de charger un ou deux véhicules Tesla en même temps. Comprend: 1 socle 4 presse-étoupes pour des options de câblage globales 4 vis de montage permettant de fixer le Wall Connector au socle",
          "categoriesNavigation": [],
          "caracteristiquesNavigation": [],
          "variantesNavigation": null
        },
        {
          "idAccessoire": 3,
          "nomAccessoire": "Mise à niveau CCS pour le Model X",
          "prix": 262,
          "description": "Cette mise à niveau de votre Model X et l'adaptateur fournit vous permettent de bénéficier de notre technologie Superchargeur V3 de dernière génération, qui assure une meilleure distribution de l'énergie sans qu'il ne soit nécessaire de partager l'alimentation avec le véhicule voisin. En plus d'être compatible avec notre réseau Superchargeur, votre Model X pourra également accéder aux stations de recharge publiques à travers l'Europe.",
          "categoriesNavigation": [],
          "caracteristiquesNavigation": [],
          "variantesNavigation": null
        },
    ];

    axios.get.mockResolvedValue({
        data: accesssoiresToCompare,
    })

    let accesssoires = await AccesssoiresController.GetAll()
    accesssoires = accesssoires.data.slice(0,3)

    expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/accessoires')
    expect(accesssoires).toStrictEqual(accesssoiresToCompare)
    });

    // GET ACCESSOIRE BY ID
    it('GetByIdAccesssoireOK', async () => {

        const accesssoireMock = {
            "idAccessoire": 1,
            "nomAccessoire": "Wall Connector",
            "prix": 500,
            "description": "Le Wall Connector est notre solution de recharge la plus pratique pour les véhicules électriques Tesla et non-Tesla. Sa conception légère assure une installation polyvalente en intérieur ou en extérieur et adaptée à une multitude de systèmes électriques. Il est conçu pour les maisons, les appartements, les établissements hôteliers et les lieux de travail.Fonctionnalités:Compatible avec tous les VE dotés d'un port de recharge de type 2Connectivité Wi-Fi pour les mises à jour du micrologiciel à distanceJusqu'à 71 km d'autonomie par heureJusqu'à 22 kW avec des réseaux électriques triphasésPartage de puissance pour prendre en charge plusieurs Wall ConnectorsInstallation facile sur les réseaux monophasés ou triphasésOuverture du port de recharge Tesla à partir du connecteurOption permettant de définir le courant maximal pendant l'installation",
            "categoriesNavigation": [
              {
                "idCategorie": 5,
                "idSurCategorie": 1,
                "categorie": "À domicile",
                "sousCategoriesNavigation": [],
                "surCategorieNavigation": null,
                "accessoiresNavigation": []
              }
            ],
            "caracteristiquesNavigation": [],
            "variantesNavigation": [
              {
                "idVariante": 54,
                "idAccessoire": 1,
                "idStyle": null,
                "idTaille": null,
                "tailleNavigation": null,
                "styleNavigation": null,
                "accessoireNavigation": null,
                "stockAccessoiresNavigation": null,
                "accessoiresComNavigation": [],
                "varianteToPhotos": null
              }
            ]
          }

        axios.get.mockResolvedValue({
            data: accesssoireMock,
        })

        const accesssoirebyid = await AccesssoiresController.GetById(1)

        expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/accessoires/ById/1')
        expect(accesssoirebyid.data).toStrictEqual(accesssoireMock)

    });

    // GET ACCESSOIRE BY NOM
    it('GetByNomAccessoireOK', async () => {

      const accessoireMock = {
        "idAccessoire": 1,
        "nomAccessoire": "Wall Connector",
        "prix": 500,
        "description": "Le Wall Connector est notre solution de recharge la plus pratique pour les véhicules électriques Tesla et non-Tesla. Sa conception légère assure une installation polyvalente en intérieur ou en extérieur et adaptée à une multitude de systèmes électriques. Il est conçu pour les maisons, les appartements, les établissements hôteliers et les lieux de travail.Fonctionnalités:Compatible avec tous les VE dotés d'un port de recharge de type 2Connectivité Wi-Fi pour les mises à jour du micrologiciel à distanceJusqu'à 71 km d'autonomie par heureJusqu'à 22 kW avec des réseaux électriques triphasésPartage de puissance pour prendre en charge plusieurs Wall ConnectorsInstallation facile sur les réseaux monophasés ou triphasésOuverture du port de recharge Tesla à partir du connecteurOption permettant de définir le courant maximal pendant l'installation",
        "categoriesNavigation": [
          {
            "idCategorie": 5,
            "idSurCategorie": 1,
            "categorie": "À domicile",
            "sousCategoriesNavigation": [],
            "surCategorieNavigation": null,
            "accessoiresNavigation": []
          }
        ],
        "caracteristiquesNavigation": [],
        "variantesNavigation": [
          {
            "idVariante": 54,
            "idAccessoire": 1,
            "idStyle": null,
            "idTaille": null,
            "tailleNavigation": null,
            "styleNavigation": null,
            "accessoireNavigation": null,
            "stockAccessoiresNavigation": null,
            "accessoiresComNavigation": [],
            "varianteToPhotos": null
          }
        ]
      }

      axios.get.mockResolvedValue({
          data: accessoireMock,
      })

      const accessoirebyname = await AccesssoiresController.GetByName("Wall Connector")

      expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/accessoires/ByNom/Wall Connector')
      expect(accessoirebyname.data).toStrictEqual(accessoireMock)

  });

    // POST ACCESSOIRE
    it('PostAccessoireOK', async () => {

        const accessoireToPost = {
            "idAccessoire": -1,
            "nomAccessoire": "Test",
            "prix": 1,
            "description": "What's up bro",
            "categoriesNavigation": [
              {
                "idCategorie": 5,
                "idSurCategorie": 1,
                "categorie": "À domicile",
                "sousCategoriesNavigation": [],
                "surCategorieNavigation": null,
                "accessoiresNavigation": []
              }
            ],
            "caracteristiquesNavigation": [],
            "variantesNavigation": [
              {
                "idVariante": 54,
                "idAccessoire": 1,
                "idStyle": null,
                "idTaille": null,
                "tailleNavigation": null,
                "styleNavigation": null,
                "accessoireNavigation": null,
                "stockAccessoiresNavigation": null,
                "accessoiresComNavigation": [],
                "varianteToPhotos": null
              }
            ]
          }

        const accessoirePostMock = {
            "idAccessoire": -1,
            "nomAccessoire": "Test",
            "prix": 1,
            "description": "What's up bro",
            "categoriesNavigation": [
              {
                "idCategorie": 5,
                "idSurCategorie": 1,
                "categorie": "À domicile",
                "sousCategoriesNavigation": [],
                "surCategorieNavigation": null,
                "accessoiresNavigation": []
              }
            ],
            "caracteristiquesNavigation": [],
            "variantesNavigation": [
              {
                "idVariante": 54,
                "idAccessoire": 1,
                "idStyle": null,
                "idTaille": null,
                "tailleNavigation": null,
                "styleNavigation": null,
                "accessoireNavigation": null,
                "stockAccessoiresNavigation": null,
                "accessoiresComNavigation": [],
                "varianteToPhotos": null
              }
            ]
          }

        axios.post.mockResolvedValue({
            data:accessoirePostMock
        })

        const newAccessoire = await AccesssoiresController.Post(accessoireToPost)

        console.log('mock')
        console.log(accessoirePostMock)

        console.log('real')
        console.log(newAccessoire.data)

        expect(axios.post).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/accessoires',accessoireToPost)
        expect(newAccessoire.data).toStrictEqual(accessoirePostMock)
    });

    // Put ACCESSOIRE
    it('PutAccessoireOK', async () => {

        const accessoireToPut = {
            "idAccessoire": 1,
            "nomAccessoire": "Wall Connector",
            "prix": 1,
            "description": "Le Wall Connector est notre solution de recharge la plus pratique pour les véhicules électriques Tesla et non-Tesla. Sa conception légère assure une installation polyvalente en intérieur ou en extérieur et adaptée à une multitude de systèmes électriques. Il est conçu pour les maisons, les appartements, les établissements hôteliers et les lieux de travail.Fonctionnalités:Compatible avec tous les VE dotés d'un port de recharge de type 2Connectivité Wi-Fi pour les mises à jour du micrologiciel à distanceJusqu'à 71 km d'autonomie par heureJusqu'à 22 kW avec des réseaux électriques triphasésPartage de puissance pour prendre en charge plusieurs Wall ConnectorsInstallation facile sur les réseaux monophasés ou triphasésOuverture du port de recharge Tesla à partir du connecteurOption permettant de définir le courant maximal pendant l'installation",
            "categoriesNavigation": [
              {
                "idCategorie": 5,
                "idSurCategorie": 1,
                "categorie": "À domicile",
                "sousCategoriesNavigation": [],
                "surCategorieNavigation": null,
                "accessoiresNavigation": []
              }
            ],
            "caracteristiquesNavigation": [],
            "variantesNavigation": [
              {
                "idVariante": 54,
                "idAccessoire": 1,
                "idStyle": null,
                "idTaille": null,
                "tailleNavigation": null,
                "styleNavigation": null,
                "accessoireNavigation": null,
                "stockAccessoiresNavigation": null,
                "accessoiresComNavigation": [],
                "varianteToPhotos": null
              }
            ]
          }
        
        const accessoirePutMock = {
            "idAccessoire": 1,
            "nomAccessoire": "Wall Connector",
            "prix": 1,
            "description": "Le Wall Connector est notre solution de recharge la plus pratique pour les véhicules électriques Tesla et non-Tesla. Sa conception légère assure une installation polyvalente en intérieur ou en extérieur et adaptée à une multitude de systèmes électriques. Il est conçu pour les maisons, les appartements, les établissements hôteliers et les lieux de travail.Fonctionnalités:Compatible avec tous les VE dotés d'un port de recharge de type 2Connectivité Wi-Fi pour les mises à jour du micrologiciel à distanceJusqu'à 71 km d'autonomie par heureJusqu'à 22 kW avec des réseaux électriques triphasésPartage de puissance pour prendre en charge plusieurs Wall ConnectorsInstallation facile sur les réseaux monophasés ou triphasésOuverture du port de recharge Tesla à partir du connecteurOption permettant de définir le courant maximal pendant l'installation",
            "categoriesNavigation": [
              {
                "idCategorie": 5,
                "idSurCategorie": 1,
                "categorie": "À domicile",
                "sousCategoriesNavigation": [],
                "surCategorieNavigation": null,
                "accessoiresNavigation": []
              }
            ],
            "caracteristiquesNavigation": [],
            "variantesNavigation": [
              {
                "idVariante": 54,
                "idAccessoire": 1,
                "idStyle": null,
                "idTaille": null,
                "tailleNavigation": null,
                "styleNavigation": null,
                "accessoireNavigation": null,
                "stockAccessoiresNavigation": null,
                "accessoiresComNavigation": [],
                "varianteToPhotos": null
              }
            ]
          }

        axios.put.mockResolvedValue({
            data:accessoirePutMock
        })
        
        const newAccessoire = await AccesssoiresController.Put(1,accessoireToPut)
        
        expect(axios.put).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/accessoires/1',accessoireToPut)
        expect(newAccessoire.data).toStrictEqual(accessoirePutMock)
    });

    // DELETE ACCESSOIRE
    it('DeleteAccessoireOK', async () => {

        const accessoireToDelete = {
            "idAccessoire": 1,
            "nomAccessoire": "Wall Connector",
            "prix": 500,
            "description": "Le Wall Connector est notre solution de recharge la plus pratique pour les véhicules électriques Tesla et non-Tesla. Sa conception légère assure une installation polyvalente en intérieur ou en extérieur et adaptée à une multitude de systèmes électriques. Il est conçu pour les maisons, les appartements, les établissements hôteliers et les lieux de travail.Fonctionnalités:Compatible avec tous les VE dotés d'un port de recharge de type 2Connectivité Wi-Fi pour les mises à jour du micrologiciel à distanceJusqu'à 71 km d'autonomie par heureJusqu'à 22 kW avec des réseaux électriques triphasésPartage de puissance pour prendre en charge plusieurs Wall ConnectorsInstallation facile sur les réseaux monophasés ou triphasésOuverture du port de recharge Tesla à partir du connecteurOption permettant de définir le courant maximal pendant l'installation",
            "categoriesNavigation": [
              {
                "idCategorie": 5,
                "idSurCategorie": 1,
                "categorie": "À domicile",
                "sousCategoriesNavigation": [],
                "surCategorieNavigation": null,
                "accessoiresNavigation": []
              }
            ],
            "caracteristiquesNavigation": [],
            "variantesNavigation": [
              {
                "idVariante": 54,
                "idAccessoire": 1,
                "idStyle": null,
                "idTaille": null,
                "tailleNavigation": null,
                "styleNavigation": null,
                "accessoireNavigation": null,
                "stockAccessoiresNavigation": null,
                "accessoiresComNavigation": [],
                "varianteToPhotos": null
              }
            ]
          }
        
        const accessoireDeleteMock = {
            "idAccessoire": 1,
            "nomAccessoire": "Wall Connector",
            "prix": 500,
            "description": "Le Wall Connector est notre solution de recharge la plus pratique pour les véhicules électriques Tesla et non-Tesla. Sa conception légère assure une installation polyvalente en intérieur ou en extérieur et adaptée à une multitude de systèmes électriques. Il est conçu pour les maisons, les appartements, les établissements hôteliers et les lieux de travail.Fonctionnalités:Compatible avec tous les VE dotés d'un port de recharge de type 2Connectivité Wi-Fi pour les mises à jour du micrologiciel à distanceJusqu'à 71 km d'autonomie par heureJusqu'à 22 kW avec des réseaux électriques triphasésPartage de puissance pour prendre en charge plusieurs Wall ConnectorsInstallation facile sur les réseaux monophasés ou triphasésOuverture du port de recharge Tesla à partir du connecteurOption permettant de définir le courant maximal pendant l'installation",
            "categoriesNavigation": [
              {
                "idCategorie": 5,
                "idSurCategorie": 1,
                "categorie": "À domicile",
                "sousCategoriesNavigation": [],
                "surCategorieNavigation": null,
                "accessoiresNavigation": []
              }
            ],
            "caracteristiquesNavigation": [],
            "variantesNavigation": [
              {
                "idVariante": 54,
                "idAccessoire": 1,
                "idStyle": null,
                "idTaille": null,
                "tailleNavigation": null,
                "styleNavigation": null,
                "accessoireNavigation": null,
                "stockAccessoiresNavigation": null,
                "accessoiresComNavigation": [],
                "varianteToPhotos": null
              }
            ]
          }

        axios.delete.mockResolvedValue({
            data:accessoireDeleteMock
        })

        const newAccessoire = await AccesssoiresController.Delete(1)
        
        
        expect(axios.delete).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/accessoires/1')
        expect(newAccessoire.data).toStrictEqual(accessoireToDelete)
    });


});