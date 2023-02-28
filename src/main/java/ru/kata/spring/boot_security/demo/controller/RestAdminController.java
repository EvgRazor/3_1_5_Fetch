package ru.kata.spring.boot_security.demo.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.Dto.UserDto;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class RestAdminController {

    private final UserService userService;
    private final ModelMapper modelMapper;
    private final RoleService roleService;



    public RestAdminController(UserService userService, ModelMapper modelMapper, RoleService roleService) {
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.roleService = roleService;
    }

    // вывод одного юзера
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getOneUserDto (@PathVariable("id") int id) {
        return new ResponseEntity<>(getUserDto(userService.getUserId(id)), HttpStatus.OK);
    }

    // вывод всех юзеров
    @GetMapping("")
    public ResponseEntity<List<UserDto>> userDtoResponseEntity (UserDto userDto) {
        return new ResponseEntity<>(userService.index().stream().map(this::getUserDto).collect(Collectors.toList()), HttpStatus.OK);
    }


    // добавить юзера
    @PostMapping("")
    public ResponseEntity<HttpStatus> addUserDto (@RequestBody UserDto userDto) {
        System.out.println("----> " + userDto);
        userService.saveUser(modelMapper.map(userDto, User.class)); // из userDto в  User.class
        return ResponseEntity.ok(HttpStatus.OK);
    }

    // удалить юзера
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable ("id") int id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    // изменяем юзера
    @PatchMapping("")
    public ResponseEntity< HttpStatus> upUser(@RequestBody UserDto userDto) {
        System.out.println(userDto);
        userService.saveUpdateUser(modelMapper.map(userDto, User.class));
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/role")
    public ResponseEntity<Collection <Role>> listResponseEntity () {
        return new ResponseEntity<>(getRoleChek(), HttpStatus.OK);
    }

    private Collection <Role> getRoleChek () {
        Collection <Role> roleSet = roleService.roleCollectionGet();
        return roleSet;
    }
    private UserDto getUserDto (User user) {
        return modelMapper.map(user, UserDto.class); // из user в UserDTo
    }

}
