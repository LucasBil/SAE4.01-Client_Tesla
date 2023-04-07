import { describe, it, expect, assert, beforeEach, afterEach } from 'vitest';
import { vi } from 'vitest'
import optionsController from "@/api/optionsController";
import { ref } from "vue";
import { shallowMount} from '@vue/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { data } from 'autoprefixer';

vi.mock('axios')

describe('OptionsControllerTests', () => {
    beforeEach(() => {
        axios.get.mockReset()
      })
    
    // GET ALL MODELES
    it('GetAllOptionsOK', async () => {

    let optionsToCompare = [
        {
            "idOption": 1,
            "idType": 1,
            "libelleOption": "Blanc Nacré Multicouches",
            "description": "De série",
            "coutAdditionnel": null,
            "detailsFonctionnalite": null,
            "typeOptionNavigation": {
                "idType": 1,
                "nomType": "Couleur extérieure",
                "obligatoire": true,
                "optionsNavigation": []
            },
            "motorisationsNavigation": [],
            "vehiculesDemoNavigation": [],
            "optionToOPM": null,
            "optionsVcfNavigation": []
        },
        {
            "idOption": 2,
            "idType": 1,
            "libelleOption": "Noir Uni",
            "description": null,
            "coutAdditionnel": 1800,
            "detailsFonctionnalite": null,
            "typeOptionNavigation": {
                "idType": 1,
                "nomType": "Couleur extérieure",
                "obligatoire": true,
                "optionsNavigation": []
            },
            "motorisationsNavigation": [],
            "vehiculesDemoNavigation": [],
            "optionToOPM": null,
            "optionsVcfNavigation": []
        },
        {
            "idOption": 3,
            "idType": 1,
            "libelleOption": "Gris Nuit Métallisé",
            "description": null,
            "coutAdditionnel": 2200,
            "detailsFonctionnalite": null,
            "typeOptionNavigation": {
                "idType": 1,
                "nomType": "Couleur extérieure",
                "obligatoire": true,
                "optionsNavigation": []
            },
            "motorisationsNavigation": [],
            "vehiculesDemoNavigation": [],
            "optionToOPM": null,
            "optionsVcfNavigation": []
        }
      ];

    axios.get.mockResolvedValue({
        data: optionsToCompare,
    })

    let options = await optionsController.GetAll()
    options = options.data.slice(0,3)

    expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/options')
    expect(options).toStrictEqual(optionsToCompare)
    });

    // GET MODELE BY ID
    it('GetByIdMotorisationOK', async () => {

        const motorisationMock = {
            "idOption": 1,
            "idType": 1,
            "libelleOption": "Blanc Nacré Multicouches",
            "description": "De série",
            "coutAdditionnel": null,
            "detailsFonctionnalite": null,
            "typeOptionNavigation": null,
            "motorisationsNavigation": [],
            "vehiculesDemoNavigation": [],
            "optionToOPM": null,
            "optionsVcfNavigation": []
        }

        axios.get.mockResolvedValue({
            data: motorisationMock,
        })

        const motorisationbyid = await optionsController.GetById(1)

        expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/options/ById/1')
        expect(motorisationbyid.data).toStrictEqual(motorisationMock)

    });

    // GET MODELE BY NAME
    it('GetByLibelleoptionsOK', async () => {

      const optionsMock = {
        "idOption": 1,
        "idType": 1,
        "libelleOption": "Blanc Nacré Multicouches",
        "description": "De série",
        "coutAdditionnel": null,
        "detailsFonctionnalite": null,
        "typeOptionNavigation": null,
        "motorisationsNavigation": [],
        "vehiculesDemoNavigation": [],
        "optionToOPM": null,
        "optionsVcfNavigation": []
    }

      axios.get.mockResolvedValue({
          data: optionsMock,
      })

      const optionsbyname = await optionsController.GetByLibelle("Blanc Nacré Multicouches")

      expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/options/ByLibelle/Blanc Nacré Multicouches')
      expect(optionsbyname.data).toStrictEqual(optionsMock)

  });

  // GET OPTIONS BY ID MOTORISATION
  it('GetByIdMotorisationoOK', async () => {

        const optionsMock = [
            {
                "idOption": 1,
                "idType": 1,
                "libelleOption": "Blanc Nacré Multicouches",
                "description": "De série",
                "coutAdditionnel": null,
                "detailsFonctionnalite": null,
                "typeOptionNavigation": {
                    "idType": 1,
                    "nomType": "Couleur extérieure",
                    "obligatoire": true,
                    "optionsNavigation": []
                },
                "motorisationsNavigation": [],
                "vehiculesDemoNavigation": [],
                "optionToOPM": null,
                "optionsVcfNavigation": []
            },
            {
                "idOption": 2,
                "idType": 1,
                "libelleOption": "Noir Uni",
                "description": null,
                "coutAdditionnel": 1800,
                "detailsFonctionnalite": null,
                "typeOptionNavigation": {
                    "idType": 1,
                    "nomType": "Couleur extérieure",
                    "obligatoire": true,
                    "optionsNavigation": []
                },
                "motorisationsNavigation": [],
                "vehiculesDemoNavigation": [],
                "optionToOPM": null,
                "optionsVcfNavigation": []
            },
            {
                "idOption": 3,
                "idType": 1,
                "libelleOption": "Gris Nuit Métallisé",
                "description": null,
                "coutAdditionnel": 2200,
                "detailsFonctionnalite": null,
                "typeOptionNavigation": {
                    "idType": 1,
                    "nomType": "Couleur extérieure",
                    "obligatoire": true,
                    "optionsNavigation": []
                },
                "motorisationsNavigation": [],
                "vehiculesDemoNavigation": [],
                "optionToOPM": null,
                "optionsVcfNavigation": []
            },
            {
                "idOption": 4,
                "idType": 1,
                "libelleOption": "Bleu Outremer Métallisé",
                "description": null,
                "coutAdditionnel": 2200,
                "detailsFonctionnalite": null,
                "typeOptionNavigation": {
                    "idType": 1,
                    "nomType": "Couleur extérieure",
                    "obligatoire": true,
                    "optionsNavigation": []
                },
                "motorisationsNavigation": [],
                "vehiculesDemoNavigation": [],
                "optionToOPM": null,
                "optionsVcfNavigation": []
            },
            {
                "idOption": 5,
                "idType": 1,
                "libelleOption": "Rouge Multicouches",
                "description": null,
                "coutAdditionnel": 2200,
                "detailsFonctionnalite": null,
                "typeOptionNavigation": {
                    "idType": 1,
                    "nomType": "Couleur extérieure",
                    "obligatoire": true,
                    "optionsNavigation": []
                },
                "motorisationsNavigation": [],
                "vehiculesDemoNavigation": [],
                "optionToOPM": null,
                "optionsVcfNavigation": []
            },
            {
                "idOption": 22,
                "idType": 2,
                "libelleOption": "Blanc",
                "description": null,
                "coutAdditionnel": 2400,
                "detailsFonctionnalite": null,
                "typeOptionNavigation": {
                    "idType": 2,
                    "nomType": "Couleur intérieure",
                    "obligatoire": true,
                    "optionsNavigation": []
                },
                "motorisationsNavigation": [],
                "vehiculesDemoNavigation": [],
                "optionToOPM": null,
                "optionsVcfNavigation": []
            },
            {
                "idOption": 21,
                "idType": 2,
                "libelleOption": "Noir",
                "description": "De série",
                "coutAdditionnel": null,
                "detailsFonctionnalite": null,
                "typeOptionNavigation": {
                    "idType": 2,
                    "nomType": "Couleur intérieure",
                    "obligatoire": true,
                    "optionsNavigation": []
                },
                "motorisationsNavigation": [],
                "vehiculesDemoNavigation": [],
                "optionToOPM": null,
                "optionsVcfNavigation": []
            },
            {
                "idOption": 24,
                "idType": 2,
                "libelleOption": "Beige",
                "description": null,
                "coutAdditionnel": 2400,
                "detailsFonctionnalite": null,
                "typeOptionNavigation": {
                    "idType": 2,
                    "nomType": "Couleur intérieure",
                    "obligatoire": true,
                    "optionsNavigation": []
                },
                "motorisationsNavigation": [],
                "vehiculesDemoNavigation": [],
                "optionToOPM": null,
                "optionsVcfNavigation": []
            },
            {
                "idOption": 6,
                "idType": 3,
                "libelleOption": "Jantes Tempest 19\"",
                "description": "De série",
                "coutAdditionnel": null,
                "detailsFonctionnalite": null,
                "typeOptionNavigation": {
                    "idType": 3,
                    "nomType": "Jantes",
                    "obligatoire": true,
                    "optionsNavigation": []
                },
                "motorisationsNavigation": [],
                "vehiculesDemoNavigation": [],
                "optionToOPM": null,
                "optionsVcfNavigation": []
            },
            {
                "idOption": 7,
                "idType": 3,
                "libelleOption": "Jantes Arachnid 21\"",
                "description": null,
                "coutAdditionnel": 4900,
                "detailsFonctionnalite": null,
                "typeOptionNavigation": {
                    "idType": 3,
                    "nomType": "Jantes",
                    "obligatoire": true,
                    "optionsNavigation": []
                },
                "motorisationsNavigation": [],
                "vehiculesDemoNavigation": [],
                "optionToOPM": null,
                "optionsVcfNavigation": []
            },
            {
                "idOption": 14,
                "idType": 5,
                "libelleOption": "Pack de pneus hiver Pirelli 19\"",
                "description": "Pneus hiver Pirelli P Zero présentant une faible résistance au roulement et une forte adhérence sur les routes enneigées. Ce pack comprend quatre jantes Tempest de 19\" et leurs pneus montés, ainsi que des enjoliveurs Tempest dark.",
                "coutAdditionnel": 4000,
                "detailsFonctionnalite": null,
                "typeOptionNavigation": {
                    "idType": 5,
                    "nomType": "Autres options",
                    "obligatoire": false,
                    "optionsNavigation": []
                },
                "motorisationsNavigation": [],
                "vehiculesDemoNavigation": [],
                "optionToOPM": null,
                "optionsVcfNavigation": []
            },
            {
                "idOption": 19,
                "idType": 5,
                "libelleOption": "Autopilot amélioré",
                "description": "Navigation en Autopilot Changement de voie auto Parking auto Sortie auto Sortie auto intelligente",
                "coutAdditionnel": 3800,
                "detailsFonctionnalite": null,
                "typeOptionNavigation": {
                    "idType": 5,
                    "nomType": "Autres options",
                    "obligatoire": false,
                    "optionsNavigation": []
                },
                "motorisationsNavigation": [],
                "vehiculesDemoNavigation": [],
                "optionToOPM": null,
                "optionsVcfNavigation": []
            },
            {
                "idOption": 20,
                "idType": 5,
                "libelleOption": "Capacité de conduite entièrement autonome",
                "description": "Toutes les fonctionnalités de l'Autopilot de base et de l'Autopilot amélioré Reconnaissance et réaction aux feux de signalisation et aux panneaux stop",
                "coutAdditionnel": 7500,
                "detailsFonctionnalite": null,
                "typeOptionNavigation": {
                    "idType": 5,
                    "nomType": "Autres options",
                    "obligatoire": false,
                    "optionsNavigation": []
                },
                "motorisationsNavigation": [],
                "vehiculesDemoNavigation": [],
                "optionToOPM": null,
                "optionsVcfNavigation": []
            }
        ]

        axios.get.mockResolvedValue({
            data: optionsMock,
        })

        const optionsbyname = await optionsController.GetByIdMotorisation(1)

        expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/options/ByIdMotorisation/1')
        expect(optionsbyname.data).toStrictEqual(optionsMock)

    });

    // POST MODELE
    it('PostOptionsOK', async () => {

        const optionsToPost = {
            "idType": 1,
            "libelleOption": "Test",
            "description": "De série",
            "coutAdditionnel": null,
            "detailsFonctionnalite": null,
            "typeOptionNavigation": null,
            "motorisationsNavigation": [],
            "vehiculesDemoNavigation": [],
            "optionToOPM": null,
            "optionsVcfNavigation": []
        }

        const optionsPostMock = {
            "idType": 1,
            "libelleOption": "Test",
            "description": "De série",
            "coutAdditionnel": null,
            "detailsFonctionnalite": null,
            "typeOptionNavigation": null,
            "motorisationsNavigation": [],
            "vehiculesDemoNavigation": [],
            "optionToOPM": null,
            "optionsVcfNavigation": []
        }

        axios.post.mockResolvedValue({
            data:optionsPostMock
        })

        const newModele = await optionsController.Post(optionsToPost)

        console.log('mock')
        console.log(optionsPostMock)

        console.log('real')
        console.log(newModele.data)

        expect(axios.post).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/options',optionsToPost)
        expect(newModele.data).toStrictEqual(optionsPostMock)
    });

    // Put MODELE
    it('PutOptionsOK', async () => {

        const modeleToPut = {
            "idOption": 1,
            "idType": 1,
            "libelleOption": "Blanc Nacré Multicouches (test)",
            "description": "De série",
            "coutAdditionnel": null,
            "detailsFonctionnalite": null,
            "typeOptionNavigation": null,
            "motorisationsNavigation": [],
            "vehiculesDemoNavigation": [],
            "optionToOPM": null,
            "optionsVcfNavigation": []
        }
        
        const modelePutMock = {
            "idOption": 1,
            "idType": 1,
            "libelleOption": "Blanc Nacré Multicouches (test)",
            "description": "De série",
            "coutAdditionnel": null,
            "detailsFonctionnalite": null,
            "typeOptionNavigation": null,
            "motorisationsNavigation": [],
            "vehiculesDemoNavigation": [],
            "optionToOPM": null,
            "optionsVcfNavigation": []
        }

        axios.put.mockResolvedValue({
            data:modelePutMock
        })
        
        const newModele = await optionsController.Put(1,modeleToPut)
        
        expect(axios.put).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/options/1',modeleToPut)
        expect(newModele.data).toStrictEqual(modelePutMock)
    });

    // DELETE MODELE
    it('DeleteModeleOK', async () => {

        const modeleToDelete = {
            "idOption": 1,
            "idType": 1,
            "libelleOption": "Blanc Nacré Multicouches",
            "description": "De série",
            "coutAdditionnel": null,
            "detailsFonctionnalite": null,
            "typeOptionNavigation": null,
            "motorisationsNavigation": [],
            "vehiculesDemoNavigation": [],
            "optionToOPM": null,
            "optionsVcfNavigation": []
        }
        
        const modeleDeleteMock = {
            "idOption": 1,
            "idType": 1,
            "libelleOption": "Blanc Nacré Multicouches",
            "description": "De série",
            "coutAdditionnel": null,
            "detailsFonctionnalite": null,
            "typeOptionNavigation": null,
            "motorisationsNavigation": [],
            "vehiculesDemoNavigation": [],
            "optionToOPM": null,
            "optionsVcfNavigation": []
        }

        axios.delete.mockResolvedValue({
            data:modeleDeleteMock
        })

        const newModele = await optionsController.Delete(1)
        
        
        expect(axios.delete).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/options/1')
        expect(newModele.data).toStrictEqual(modeleToDelete)
    });


});