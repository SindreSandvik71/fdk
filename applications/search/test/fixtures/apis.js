export default [
  {
    "total": 3,
    "hits": [
      {
        "uri": "jar:file:/app.jar!/BOOT-INF/classes!/datakatalog-api.json",
        "title": {
          "no": "National Data Directory Search API"
        },
        "description": {
          "no": "Provides a basic search api against the National Data Directory of Norway"
        },
        "contactPoint": [
          {
            "uri": "https://fellesdatakatalog.brreg.no",
            "email": "fellesdatakatalog@brreg.no",
            "organizationName": "Brønnøysundregistrene"
          }
        ],
        "openApi": {
          "openapi": null,
          "info": {
            "description": "Provides a basic search api against the National Data Directory of Norway",
            "version": "1.0",
            "title": "National Data Directory Search API",
            "termsOfService": "https://fellesdatakatalog.brreg.no/about",
            "contact": {
              "name": "Brønnøysundregistrene",
              "url": "https://fellesdatakatalog.brreg.no",
              "email": "fellesdatakatalog@brreg.no"
            },
            "license": {
              "name": "License of API",
              "url": "http://data.norge.no/nlod/no/2.0"
            }
          },
          "servers": null,
          "paths": {
            "/catalogs": {
              "get": {
                "description": "The three formats are: text/turtle, application/ld+json and application/rdf+xml",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            },
            "/harvest/catalog": {
              "get": {
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            },
            "/catalogs/datasets": {
              "get": {
                "description": "The three formats are: text/turtle, application/ld+json and application/rdf+xml",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            },
            "/publisher/hierarchy": {
              "get": {
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            },
            "/datasets": {
              "get": {
                "description": "Returns a list of matching datasets wrapped in a elasticsearch response. Max number returned by a single query is 100. Size parameters greater than 100 will not return more than 100 datasets. In order to access all datasets, use multiple queries and increment from parameter.",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            },
            "/datasets/**": {
              "get": {
                "description": "You must specify the dataset's identifier",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            },
            "/publisher": {
              "get": {
                "description": "Returns the elasticsearch response with matching publishers",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            },
            "/aggregateDataset": {
              "get": {
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            },
            "/terms": {
              "get": {
                "description": "Returns the elasticsearch response with matching terms (dct:subject)",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            }
          }
        }
      },
      {
        "uri": "jar:file:/app.jar!/BOOT-INF/classes!/enhetsreg-static.json",
        "title": {
          "no": "Åpne data - Enhetsregisteret"
        },
        "description": {
          "no": "Tilbyr et utvalg av opplysninger om alle registrerte enheter i Enhetsregisteret"
        },
        "contactPoint": [
          {
            "uri": "http://www.brreg.no",
            "email": "opendata@brreg.no",
            "organizationName": "Brønnøysundregistrene"
          }
        ],
        "openApi": {
          "openapi": "3.0.1",
          "info": {
            "description": "Tilbyr et utvalg av opplysninger om alle registrerte enheter i Enhetsregisteret",
            "version": "0.1",
            "title": "Åpne data - Enhetsregisteret",
            "termsOfService": "https://fellesdatakatalog.brreg.no/about",
            "contact": {
              "name": "Brønnøysundregistrene",
              "url": "http://www.brreg.no",
              "email": "opendata@brreg.no"
            },
            "license": {
              "name": "Norsk lisens for offentlige data (NLOD) 2.0",
              "url": "http://data.norge.no/nlod/no/2.0"
            }
          },
          "servers": [
            {
              "url": "https://data.brreg.no/enhetsregisteret/api",
              "description": "Produksjonsserver"
            }
          ],
          "paths": {
            "/organisasjonsformer/underenheter": {
              "get": {
                "description": "Hent alle organisasjonsformer for underenheter",
                "responses": {
                  "200": {
                    "description": "En liste med organisasjonsformer"
                  }
                }
              }
            },
            "/organisasjonsformer/enheter": {
              "get": {
                "description": "Hent alle organisasjonsformer for enheter",
                "responses": {
                  "200": {
                    "description": "En liste med organisasjonsformer"
                  }
                }
              }
            },
            "/underenheter/{orgnr}": {
              "get": {
                "description": "Hent en spesifikk underenhet",
                "responses": {
                  "200": {
                    "description": "En underenhete"
                  }
                }
              }
            },
            "/enheter": {
              "get": {
                "description": "Søk etter enheter",
                "responses": {
                  "200": {
                    "description": "En liste med enheter"
                  }
                }
              }
            },
            "/enheter/lastned": {
              "get": {
                "description": "Last ned enheter",
                "responses": {
                  "200": {
                    "description": "Zip-fil lastes ned"
                  }
                }
              }
            },
            "/underenheter/lastned": {
              "get": {
                "description": "Last ned underenheter",
                "responses": {
                  "200": {
                    "description": "En liste med underenheter"
                  }
                }
              }
            },
            "/organisasjonsformer/{orgkode}": {
              "get": {
                "description": "Hent en gitt organisasjonsform",
                "responses": {
                  "200": {
                    "description": "Beskrivelse av organisasjonsform"
                  }
                }
              }
            },
            "/enheter/{orgnr}": {
              "get": {
                "description": "Hent en spesifikk enhet",
                "responses": {
                  "200": {
                    "description": "En enhet"
                  }
                }
              }
            },
            "/organisasjonsformer": {
              "get": {
                "description": "Hent alle organisasjonsformer",
                "responses": {
                  "200": {
                    "description": "En liste med organisasjonsformer"
                  }
                }
              }
            },
            "/": {
              "get": {
                "description": "Rot. lister lenker til øvrige objekter",
                "responses": {
                  "200": {
                    "description": "En liste med lenker til øvrige tjenester"
                  }
                }
              }
            },
            "/underenheter": {
              "get": {
                "description": "Søk etter underenheter",
                "responses": {
                  "200": {
                    "description": "En liste med underenheter"
                  }
                }
              }
            }
          }
        }
      },
      {
        "uri": "jar:file:/app.jar!/BOOT-INF/classes!/seres-api.json",
        "title": {
          "no": "SERES3 REPOSITORY"
        },
        "description": {
          "no": "Modellkatalogtjeneste for SERES - domeneklient"
        },
        "contactPoint": [
          {
            "uri": "http://www.brreg.no/",
            "email": "seres@brreg.no",
            "organizationName": "SERES brukerstøtte"
          }
        ],
        "openApi": {
          "openapi": null,
          "info": {
            "description": "Modellkatalogtjeneste for SERES - domeneklient",
            "version": "1.0",
            "title": "SERES3 REPOSITORY",
            "termsOfService": "Terms of service",
            "contact": {
              "name": "SERES brukerstøtte",
              "url": "http://www.brreg.no/",
              "email": "seres@brreg.no"
            },
            "license": {
              "name": "License of API",
              "url": "API license URL"
            }
          },
          "servers": null,
          "paths": {
            "/seres/v1/repository/catalogs/{catalog}/{domain}/{model}": {
              "get": {
                "description": "Returns a model object",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              },
              "put": {
                "description": "Updated the values of the model object",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "201": {
                    "description": "Created"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            },
            "/seres/v1/repository/catalogs/{catalog}/{domain}/{model}/versions": {
              "get": {
                "description": "Returns a list of version objects",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              },
              "post": {
                "description": "Create the model version from scratch",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "201": {
                    "description": "Created"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            },
            "/seres/v1/repository/catalogs/{catalog}/{domain}/{model}/{version}": {
              "get": {
                "description": "get a specific version object",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              },
              "put": {
                "description": "creates a new version object by copying it from another version",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "201": {
                    "description": "Created"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              },
              "delete": {
                "description": "deletes the refered version",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "204": {
                    "description": "No Content"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  }
                }
              }
            },
            "/seres/v1/repository/catalogs/{catalog}/{domain}/models": {
              "get": {
                "description": "Returns a the list of model objects in a domain",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              },
              "post": {
                "description": "Returns the created model object",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "201": {
                    "description": "Created"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            },
            "/seres/v1/repository/catalogs/{catalog}/{domain}/{model}/{version}/copy": {
              "post": {
                "description": "creates a new version object by copying it from another version",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "201": {
                    "description": "Created"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            },
            "/seres/v1/repository/catalogs/{catalog}/domains": {
              "get": {
                "description": "Returns a list of all domains under a specific catalog",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              },
              "post": {
                "description": "Returns the created domain",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "201": {
                    "description": "Created"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            },
            "/seres/v1/repository/catalogs/{catalog}": {
              "get": {
                "description": "Returns the catalog",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              },
              "put": {
                "description": "returns the updated catalog",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "201": {
                    "description": "Created"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            },
            "/seres/v1/repository/catalogs/{catalog}/{domain}/{model}/{version}/history": {
              "put": {
                "description": "changes the version state attribute to historic",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "201": {
                    "description": "Created"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            },
            "/seres/v1/repository/catalogs": {
              "get": {
                "description": "Returns a list of all catalogs stored by the repository (currently restriced to 1000 catalogs)",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              },
              "post": {
                "description": "Returns the created catalog",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "201": {
                    "description": "Created"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            },
            "/seres/v1/repository/catalogs/{catalog}/{domain}/{model}/{version}/approve": {
              "put": {
                "description": "changes the version state attribute to approved",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "201": {
                    "description": "Created"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            },
            "/seres/v1/repository/catalogs/{catalog}/{domain}/{model}/{version}/reject": {
              "put": {
                "description": "changes the version state attribute to rejected",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "201": {
                    "description": "Created"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            },
            "/seres/v1/repository/versions/{versionReference}/changelog": {
              "get": {
                "description": "Returns the change events that has occured to a specific model-version. Pagination is required: ?page=0&size=20",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            },
            "/seres/v1/repository/catalogs/{catalog}/{domain}": {
              "get": {
                "description": "Returns the domain object requested",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              },
              "put": {
                "description": "Updates the domain object",
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "201": {
                    "description": "Created"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            },
            "/seres/v1/repository/catalogs/{catalog}/{domain}/{model}/{version}/data": {
              "get": {
                "responses": {
                  "200": {
                    "description": "OK"
                  },
                  "401": {
                    "description": "Unauthorized"
                  },
                  "403": {
                    "description": "Forbidden"
                  },
                  "404": {
                    "description": "Not Found"
                  }
                }
              }
            }
          }
        }
      }
    ]
  }
];
