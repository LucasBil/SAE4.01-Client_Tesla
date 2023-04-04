import { describe, it, expect, assert, beforeEach, afterEach } from 'vitest';
import { vi } from 'vitest'
import motorisationsController from "@/api/motorisationsController";
import { ref } from "vue";
import { shallowMount} from '@vue/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { data } from 'autoprefixer';

vi.mock('axios')

describe('MotorisationsControllerTests', () => {
    beforeEach(() => {
        axios.get.mockReset()
      })
    
    // GET ALL MODELES
    it('GetAllMotorisationsOK', async () => {

    let motorisationsToCompare = [
        {
            "idMotorisation": 1,
            "idModele": 1,
            "nomMotorisation": "Modèle S",
            "prix": 115000,
            "classeEnergetique": "A",
            "description": "Puissance et efficacité Tesla a conçu la Model S comme un véhicule électrique depuis une page blanche. Chaque composant, y compris les batteries, les moteurs et l'aérodynamique extérieure, est optimisé pour tirer parti des autres composants et créer l'un des véhicules les plus efficients et incroyablement puissants jamais construits. *Hors lancement, environ 30 cm. La vitesse maximale indiquée pour le modèle Plaid nécessite des mises à niveau matérielles payantes.",
            "optionsNavigation": [],
            "modeleNavigation": null,
            "caracteristiquesNavigation": [],
            "motorisationToOPM": null,
            "vehiculesDemoNavigation": [],
            "vehiculesConfigurableNavigation": []
        },
        {
            "idMotorisation": 2,
            "idModele": 1,
            "nomMotorisation": "Modèle S Plaid",
            "prix": 138990,
            "classeEnergetique": "A",
            "description": "Puissance et efficacité Tesla a conçu la Model S comme un véhicule électrique depuis une page blanche. Chaque composant, y compris les batteries, les moteurs et l'aérodynamique extérieure, est optimisé pour tirer parti des autres composants et créer l'un des véhicules les plus efficients et incroyablement puissants jamais construits. *Hors lancement, environ 30 cm. La vitesse maximale indiquée pour le modèle Plaid nécessite des mises à niveau matérielles payantes.",
            "optionsNavigation": [],
            "modeleNavigation": null,
            "caracteristiquesNavigation": [],
            "motorisationToOPM": null,
            "vehiculesDemoNavigation": [],
            "vehiculesConfigurableNavigation": []
        },
        {
            "idMotorisation": 3,
            "idModele": 2,
            "nomMotorisation": "Modèle 3 ",
            "prix": 53490,
            "classeEnergetique": "A",
            "description": "Puissance et efficacité Tesla a conçu la Model 3 en tant que véhicule électrique de A à Z, avec une intégration verticale complète. Tous les composants, y compris les batteries, les moteurs et même l'aérodynamique extérieure, sont optimisés pour tirer parti les uns des autres et créer l'un des véhicules les plus économes en énergie, et pourtant incroyablement puissants jamais créés. *Hors lancement, environ 30 cm. Temps très froid Pour une meilleure expérience de conduite sur de longues distances dans les conditions de conduite les plus froides, nous recommandons la Model 3 Grande Autonomie ou Performance.",
            "optionsNavigation": [],
            "modeleNavigation": null,
            "caracteristiquesNavigation": [],
            "motorisationToOPM": null,
            "vehiculesDemoNavigation": [],
            "vehiculesConfigurableNavigation": []
        }
      ];

    axios.get.mockResolvedValue({
        data: motorisationsToCompare,
    })

    let motorisations = await motorisationsController.GetAll()
    motorisations = motorisations.data.slice(0,3)

    expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/motorisations')
    expect(motorisations).toStrictEqual(motorisationsToCompare)
    });

    // GET MODELE BY ID
    it('GetByIdMotorisationOK', async () => {

        const motorisationMock = {
            "idMotorisation": 1,
            "idModele": 1,
            "nomMotorisation": "Modèle S",
            "prix": 115000,
            "classeEnergetique": "A",
            "description": "Puissance et efficacité Tesla a conçu la Model S comme un véhicule électrique depuis une page blanche. Chaque composant, y compris les batteries, les moteurs et l'aérodynamique extérieure, est optimisé pour tirer parti des autres composants et créer l'un des véhicules les plus efficients et incroyablement puissants jamais construits. *Hors lancement, environ 30 cm. La vitesse maximale indiquée pour le modèle Plaid nécessite des mises à niveau matérielles payantes.",
            "optionsNavigation": [],
            "modeleNavigation": null,
            "caracteristiquesNavigation": [],
            "motorisationToOPM": null,
            "vehiculesDemoNavigation": [],
            "vehiculesConfigurableNavigation": []
          }

        axios.get.mockResolvedValue({
            data: motorisationMock,
        })

        const motorisationbyid = await motorisationsController.GetById(1)

        expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/motorisations/ById/1')
        expect(motorisationbyid.data).toStrictEqual(motorisationMock)

    });

    // GET MODELE BY NAME
    it('GetByNamemotorisationsOK', async () => {

      const motorisationsMock = {
        "idMotorisation": 1,
        "idModele": 1,
        "nomMotorisation": "Modèle S",
        "prix": 115000,
        "classeEnergetique": "A",
        "description": "Puissance et efficacité Tesla a conçu la Model S comme un véhicule électrique depuis une page blanche. Chaque composant, y compris les batteries, les moteurs et l'aérodynamique extérieure, est optimisé pour tirer parti des autres composants et créer l'un des véhicules les plus efficients et incroyablement puissants jamais construits. *Hors lancement, environ 30 cm. La vitesse maximale indiquée pour le modèle Plaid nécessite des mises à niveau matérielles payantes.",
        "optionsNavigation": [],
        "modeleNavigation": null,
        "caracteristiquesNavigation": [],
        "motorisationToOPM": null,
        "vehiculesDemoNavigation": [],
        "vehiculesConfigurableNavigation": []
        }

      axios.get.mockResolvedValue({
          data: motorisationsMock,
      })

      const motorisationsbyname = await motorisationsController.GetByName("Modèle S")

      expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/motorisations/ByName/Modèle S')
      expect(motorisationsbyname.data).toStrictEqual(motorisationsMock)

  });

    // POST MODELE
    it('PostMotorisationsOK', async () => {

        const motorisationsToPost = {
          "idModele": 1,
          "nomMotorisation": "Modèle S",
          "prix": 115000,
          "classeEnergetique": "A",
          "description": "Puissance et efficacité Tesla a conçu la Model S comme un véhicule électrique depuis une page blanche. Chaque composant, y compris les batteries, les moteurs et l'aérodynamique extérieure, est optimisé pour tirer parti des autres composants et créer l'un des véhicules les plus efficients et incroyablement puissants jamais construits. *Hors lancement, environ 30 cm. La vitesse maximale indiquée pour le modèle Plaid nécessite des mises à niveau matérielles payantes.",
          "optionsNavigation": [],
          "modeleNavigation": null,
          "caracteristiquesNavigation": [],
          "motorisationToOPM": null,
          "vehiculesDemoNavigation": [],
          "vehiculesConfigurableNavigation": []
        }

        const motorisationsPostMock = {
          "idMotorisation": 1,
          "idModele": 1,
          "nomMotorisation": "Modèle S",
          "prix": 115000,
          "classeEnergetique": "A",
          "description": "Puissance et efficacité Tesla a conçu la Model S comme un véhicule électrique depuis une page blanche. Chaque composant, y compris les batteries, les moteurs et l'aérodynamique extérieure, est optimisé pour tirer parti des autres composants et créer l'un des véhicules les plus efficients et incroyablement puissants jamais construits. *Hors lancement, environ 30 cm. La vitesse maximale indiquée pour le modèle Plaid nécessite des mises à niveau matérielles payantes.",
          "optionsNavigation": [],
          "modeleNavigation": null,
          "caracteristiquesNavigation": [],
          "motorisationToOPM": null,
          "vehiculesDemoNavigation": [],
          "vehiculesConfigurableNavigation": []
        }

        axios.post.mockResolvedValue({
            data:motorisationsPostMock
        })

        const newModele = await motorisationsController.Post(motorisationsToPost)

        console.log('mock')
        console.log(motorisationsPostMock)

        console.log('real')
        console.log(newModele.data)

        expect(axios.post).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/motorisations',motorisationsToPost)
        expect(newModele.data).toStrictEqual(motorisationsPostMock)
    });

    // Put MODELE
    it('PutMotorisationsOK', async () => {

        const modeleToPut = {
            "idMotorisation": 1,
            "idModele": 1,
            "nomMotorisation": "Modèle Sus",
            "prix": 115000,
            "classeEnergetique": "A",
            "description": "Puissance et efficacité Tesla a conçu la Model S comme un véhicule électrique depuis une page blanche. Chaque composant, y compris les batteries, les moteurs et l'aérodynamique extérieure, est optimisé pour tirer parti des autres composants et créer l'un des véhicules les plus efficients et incroyablement puissants jamais construits. *Hors lancement, environ 30 cm. La vitesse maximale indiquée pour le modèle Plaid nécessite des mises à niveau matérielles payantes.",
            "optionsNavigation": [],
            "modeleNavigation": null,
            "caracteristiquesNavigation": [],
            "motorisationToOPM": null,
            "vehiculesDemoNavigation": [],
            "vehiculesConfigurableNavigation": []
          }
        
        const modelePutMock = {
          "idMotorisation": 1,
          "idModele": 1,
          "nomMotorisation": "Modèle Sus",
          "prix": 115000,
          "classeEnergetique": "A",
          "description": "Puissance et efficacité Tesla a conçu la Model S comme un véhicule électrique depuis une page blanche. Chaque composant, y compris les batteries, les moteurs et l'aérodynamique extérieure, est optimisé pour tirer parti des autres composants et créer l'un des véhicules les plus efficients et incroyablement puissants jamais construits. *Hors lancement, environ 30 cm. La vitesse maximale indiquée pour le modèle Plaid nécessite des mises à niveau matérielles payantes.",
          "optionsNavigation": [],
          "modeleNavigation": null,
          "caracteristiquesNavigation": [],
          "motorisationToOPM": null,
          "vehiculesDemoNavigation": [],
          "vehiculesConfigurableNavigation": []
          }

        axios.put.mockResolvedValue({
            data:modelePutMock
        })
        
        const newModele = await motorisationsController.Put(1,modeleToPut)
        
        expect(axios.put).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/motorisations/1',modeleToPut)
        expect(newModele.data).toStrictEqual(modelePutMock)
    });

    // DELETE MODELE
    it('DeleteModeleOK', async () => {

        const modeleToDelete = {
          "idMotorisation": 1,
          "idModele": 1,
          "nomMotorisation": "Modèle S",
          "prix": 115000,
          "classeEnergetique": "A",
          "description": "Puissance et efficacité Tesla a conçu la Model S comme un véhicule électrique depuis une page blanche. Chaque composant, y compris les batteries, les moteurs et l'aérodynamique extérieure, est optimisé pour tirer parti des autres composants et créer l'un des véhicules les plus efficients et incroyablement puissants jamais construits. *Hors lancement, environ 30 cm. La vitesse maximale indiquée pour le modèle Plaid nécessite des mises à niveau matérielles payantes.",
          "optionsNavigation": [],
          "modeleNavigation": null,
          "caracteristiquesNavigation": [],
          "motorisationToOPM": null,
          "vehiculesDemoNavigation": [],
          "vehiculesConfigurableNavigation": []
          }
        
        const modeleDeleteMock = {
          "idMotorisation": 1,
          "idModele": 1,
          "nomMotorisation": "Modèle S",
          "prix": 115000,
          "classeEnergetique": "A",
          "description": "Puissance et efficacité Tesla a conçu la Model S comme un véhicule électrique depuis une page blanche. Chaque composant, y compris les batteries, les moteurs et l'aérodynamique extérieure, est optimisé pour tirer parti des autres composants et créer l'un des véhicules les plus efficients et incroyablement puissants jamais construits. *Hors lancement, environ 30 cm. La vitesse maximale indiquée pour le modèle Plaid nécessite des mises à niveau matérielles payantes.",
          "optionsNavigation": [],
          "modeleNavigation": null,
          "caracteristiquesNavigation": [],
          "motorisationToOPM": null,
          "vehiculesDemoNavigation": [],
          "vehiculesConfigurableNavigation": []
          }

        axios.delete.mockResolvedValue({
            data:modeleDeleteMock
        })

        const newModele = await motorisationsController.Delete(1)
        
        
        expect(axios.delete).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/motorisations/1')
        expect(newModele.data).toStrictEqual(modeleToDelete)
    });


});