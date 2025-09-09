package com.vitanova.backend;


import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerIntegrationTest {



//    @Autowired
//    private UserRepository userRepo;
//
//    @BeforeEach
//    void cleanDb() {
//        userRepo.deleteAll();
//    }
//
//    @Test
//    void me_WithOAuth2Login_ShouldPersistAndReturnEmailAndName() throws Exception {
//        mvc.perform(get("/api/users/me")
//                        .with(SecurityMockMvcRequestPostProcessors.oauth2Login(oauth -> oauth
//                                .attributes(attrs -> {
//                                    attrs.put("sub",   "int-uuid");
//                                    attrs.put("email", "bob@int.com");
//                                    attrs.put("name",  "Bob");
//                                })
//                        ))
//                        .header("Origin", "http://localhost:3000"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.email").value("bob@int.com"))
//                .andExpect(jsonPath("$.name").value("Bob"))
//                // ensure DB-generated id is present in the payload
//                .andExpect(jsonPath("$.id").isNumber());
//
//        var saved = userRepo.findByCognitoUuid("int-uuid").orElseThrow();
//        assertThat(saved.getEmail()).isEqualTo("bob@int.com");
//        assertThat(saved.getName()).isEqualTo("Bob");
//    }
//
//    @Test
//    void deleteMe_WithOAuth2Login_ShouldRemoveUserFromDb() throws Exception {
//        // pre-populate (only name & email needed; id is auto-generated)
//        UserModel entity = new UserModel();
//        entity.setCognitoUuid("int-uuid");
//        entity.setEmail("bob@int.com");
//        entity.setName("Bob");
//        userRepo.save(entity);
//
//        mvc.perform(delete("/api/users/me")
//                        .with(SecurityMockMvcRequestPostProcessors.oauth2Login(oauth -> oauth
//                                .attributes(a -> a.put("sub", "int-uuid"))
//                        ))
//                        .header("Origin", "http://localhost:3000"))
//                .andExpect(status().isNoContent());
//
//        assertThat(userRepo.findByCognitoUuid("int-uuid"))
//                .isNotPresent();
//    }
//
//    @Test
//    void me_WithoutAuth_ShouldReturn401() throws Exception {
//        mvc.perform(get("/api/users/me"))
//                .andExpect(status().isUnauthorized());
//    }
}
