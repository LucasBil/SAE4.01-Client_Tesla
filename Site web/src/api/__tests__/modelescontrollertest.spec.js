import { describe, it, expect, assert, beforeEach, afterEach } from 'vitest';
import { vi } from 'vitest'
import modelesController from "@/api/modelesController";
import { ref } from "vue";
import { shallowMount} from '@vue/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { data } from 'autoprefixer';

vi.mock('axios')

describe('ModelesControllerTests', () => {
    beforeEach(() => {
        axios.get.mockReset()
      })
    
    // GET ALL MODELES
    it('GetAllModelesOK', async () => {

    let modelesToCompare = [
        {
          "idModele": 1,
          "nomModele": "MODELE S",
          "essayable": false,
          "photo": {
            "nomCouleur": "Rouge",
            "codeHexa": "#FE2E2E",
            "urlModel": [
              "51.83.36.122:8081/src/sae401/img/modele/teslaS.jpg"
            ]
          },
          "motorisationsNavigation": []
        },
        {
          "idModele": 2,
          "nomModele": "MODELE 3",
          "essayable": true,
          "photo": {
            "nomCouleur": "Rouge",
            "codeHexa": "#FE2E2E",
            "urlModel": [
              "51.83.36.122:8081/src/sae401/img/modele/tesla3.jpg"
            ]
          },
          "motorisationsNavigation": []
        },
        {
          "idModele": 3,
          "nomModele": "MODELE X",
          "essayable": false,
          "photo": {
            "nomCouleur": "Blanc",
            "codeHexa": "#FFFFFF",
            "urlModel": [
              "51.83.36.122:8081/src/sae401/img/modele/teslaX.jpg"
            ]
          },
          "motorisationsNavigation": []
        },
        {
          "idModele": 4,
          "nomModele": "MODELE Y",
          "essayable": true,
          "photo": {
            "nomCouleur": "Bleu",
            "codeHexa": "#0049FF",
            "urlModel": [
              "51.83.36.122:8081/src/sae401/img/modele/teslaY.jpg"
            ]
          },
          "motorisationsNavigation": []
        }
      ];

    axios.get.mockResolvedValue({
        data: modelesToCompare,
    })

    let modeles = await modelesController.GetAll()
    modeles = modeles.data.slice(0,4)

    expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/modeles')
    expect(modeles).toStrictEqual(modelesToCompare)
    });

    // GET MODELE BY ID
    it('GetByIdmodelesOK', async () => {

        const modelesMock = {
            "idModele": 1,
            "nomModele": "MODELE S",
            "essayable": false,
            "photo": {
              "nomCouleur": "Rouge",
              "codeHexa": "#FE2E2E",
              "urlModel": [
                "51.83.36.122:8081/src/sae401/img/modele/teslaS.jpg"
              ]
            },
            "motorisationsNavigation": []
          }

        axios.get.mockResolvedValue({
            data: modelesMock,
        })

        const modelesbyid = await modelesController.GetById(1)

        expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/modeles/ById/1')
        expect(modelesbyid.data).toStrictEqual(modelesMock)

    });

    // GET MODELE BY NAME
    it('GetByNamemodelesOK', async () => {

      const modelesMock = {
          "idModele": 1,
          "nomModele": "MODELE S",
          "essayable": false,
          "photo": {
            "nomCouleur": "Rouge",
            "codeHexa": "#FE2E2E",
            "urlModel": [
              "51.83.36.122:8081/src/sae401/img/modele/teslaS.jpg"
            ]
          },
          "motorisationsNavigation": []
        }

      axios.get.mockResolvedValue({
          data: modelesMock,
      })

      const modelesbyname = await modelesController.GetByName("MODELE S")

      expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/modeles/ByName/MODELE S')
      expect(modelesbyname.data).toStrictEqual(modelesMock)

  });

    // POST MODELE
    it('PostModelesOK', async () => {

        const modelesToPost = {
            "nomModele": "MODELE Z",
            "essayable": false,
            "photo": {
                "nomCouleur": "Rouge",
                "codeHexa": "#FE2E2E",
                "urlModel": [
                "51.83.36.122:8081/src/sae401/img/modele/teslaS.jpg"
                ]
            }
        }

        const modelesPostMock = {
            "nomModele": "MODELE Z",
            "essayable": false,
            "photo": {
                "nomCouleur": "Rouge",
                "codeHexa": "#FE2E2E",
                "urlModel": [
                "51.83.36.122:8081/src/sae401/img/modele/teslaS.jpg"
                ]
            }
        }

        axios.post.mockResolvedValue({
            data:modelesPostMock
        })

        const newModele = await modelesController.Post(modelesToPost)

        console.log('mock')
        console.log(modelesPostMock)

        console.log('real')
        console.log(newModele.data)

        expect(axios.post).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/modeles',modelesToPost)
        expect(newModele.data).toStrictEqual(modelesPostMock)
    });

    // Put MODELE
    it('PutModelesOK', async () => {

        const modeleToPut = {
            "idModele": 1,
            "nomModele": "MODELE S2",
            "essayable": false,
            "photo": {
              "nomCouleur": "Rouge",
              "codeHexa": "#FE2E2E",
              "urlModel": [
                "51.83.36.122:8081/src/sae401/img/modele/teslaS.jpg"
              ]
            },
            "motorisationsNavigation": []
          }
        
        const modelePutMock = {
            "idModele": 1,
            "nomModele": "MODELE S2",
            "essayable": false,
            "photo": {
              "nomCouleur": "Rouge",
              "codeHexa": "#FE2E2E",
              "urlModel": [
                "51.83.36.122:8081/src/sae401/img/modele/teslaS.jpg"
              ]
            },
            "motorisationsNavigation": []
          }

        axios.put.mockResolvedValue({
            data:modelePutMock
        })
        
        const newModele = await modelesController.Put(1,modeleToPut)
        
        expect(axios.put).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/modeles/1',modeleToPut)
        expect(newModele.data).toStrictEqual(modelePutMock)
    });

    // DELETE MODELE
    it('DeleteModeleOK', async () => {

        const modeleToDelete = {
            "idModele": 1,
            "nomModele": "MODELE S",
            "essayable": false,
            "photo": {
              "nomCouleur": "Rouge",
              "codeHexa": "#FE2E2E",
              "urlModel": [
                "51.83.36.122:8081/src/sae401/img/modele/teslaS.jpg"
              ]
            },
            "motorisationsNavigation": []
          }
        
        const modeleDeleteMock = {
            "idModele": 1,
            "nomModele": "MODELE S",
            "essayable": false,
            "photo": {
              "nomCouleur": "Rouge",
              "codeHexa": "#FE2E2E",
              "urlModel": [
                "51.83.36.122:8081/src/sae401/img/modele/teslaS.jpg"
              ]
            },
            "motorisationsNavigation": []
          }

        axios.delete.mockResolvedValue({
            data:modeleDeleteMock
        })

        const newModele = await modelesController.Delete(1)
        
        
        expect(axios.delete).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/modeles/1')
        expect(newModele.data).toStrictEqual(modeleToDelete)
    });


});