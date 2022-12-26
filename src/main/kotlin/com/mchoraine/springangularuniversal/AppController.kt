package com.mchoraine.springangularuniversal

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping


@Controller
class AppController() {

    @GetMapping(path = ["basket"])
    fun getBasket(): String {
        return "index"
    }
    @GetMapping(path = ["/", ""])
    fun getHome(): String {
        return "index"
    }
}
