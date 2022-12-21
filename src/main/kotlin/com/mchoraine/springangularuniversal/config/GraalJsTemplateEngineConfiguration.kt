package com.mchoraine.springangularuniversal.config

import com.mchoraine.springangularuniversal.engine.GraalJSViewResolver
import com.mchoraine.springangularuniversal.engine.GraalJsEngine
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class GraalJsTemplateEngineConfiguration {

    @Configuration(proxyBeanMethods = false)
    internal class DefaultTemplateEngineConfiguration {
        @Bean
        @ConditionalOnMissingBean
        fun viewResolver(graalJsTemplateEngine: GraalJsEngine): GraalJSViewResolver {
            val viewResolver = GraalJSViewResolver(graalJsTemplateEngine)
            return viewResolver
        }

        @Bean
        @ConditionalOnMissingBean(name = ["graalJsTemplateEngine"])
        fun graalJsTemplateEngine(): GraalJsEngine {
            return GraalJsEngine()
        }
    }
}
