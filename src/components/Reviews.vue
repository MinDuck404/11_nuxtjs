<template>
    <section class="wrapper bg-gradient-primary">
        <div class="container pt-12 pt-lg-8 pb-14 pb-md-17">
            <div class="row text-center">
                <div class="col-lg-8 offset-lg-2">
                    <h2 class="fs-16 text-uppercase text-primary mb-3">Happy Customers</h2>
                    <h3 class="display-3 mb-10 px-xxl-10">Don't take our word for it. See what customers are saying about us.</h3>
                </div>
            </div>
            
            <!-- Improved Grid Layout -->
            <div class="row gy-4 gx-4">
                <div class="col-md-6 col-lg-4" v-for="(review, index) in reviews" :key="index">
                    <div class="card shadow-lg h-100">
                        <div class="card-body d-flex flex-column">
                            <div class="ratings-stars mb-3">
                                <i class="star-icon">★</i>
                                <i class="star-icon">★</i>
                                <i class="star-icon">★</i>
                                <i class="star-icon">★</i>
                                <i class="star-icon">★</i>
                            </div>
                            <blockquote class="border-0 mb-0 flex-grow-1">
                                <p class="mb-4">"{{ review.quote }}"</p>
                                <div class="blockquote-details mt-auto">
                                    <img class="rounded-circle avatar-img" 
                                         :src="review.avatar" 
                                         :srcset="review.avatar + ' 2x'" 
                                         :alt="review.name">
                                         
                                    <div class="info">
                                        <h5 class="mb-1">{{ review.name }}</h5>
                                        <p class="mb-0">{{ review.position }}</p>
                                    </div>
                                </div>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Reviews',
    data() {
        return {
            reviews: [
                {
                    quote: "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Vestibulum id ligula porta felis euismod semper. Cras justo odio dapibus facilisis sociis natoque penatibus.",
                    name: "Coriss Ambady",
                    position: "Financial Analyst",
                    avatar: "/img/te1.jpg"
                },
                {
                    quote: "Fusce dapibus, tellus ac cursus tortor mauris condimentum fermentum massa justo sit amet. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed.",
                    name: "Cory Zamora",
                    position: "Marketing Specialist",
                    avatar: "/img/te2.jpg"
                },
                {
                    quote: "Curabitur blandit tempus porttitor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget porta ac consectetur vestibulum. Donec sed odio dui consectetur adipiscing elit.",
                    name: "Nikolas Brooten",
                    position: "Sales Manager",
                    avatar: "/img/te3.jpg"
                },
                {
                    quote: "Etiam adipiscing tincidunt elit convallis felis suscipit ut. Phasellus rhoncus tincidunt auctor. Nullam eu sagittis mauris. Donec non dolor ac elit aliquam tincidunt at at sapien. Aenean tortor libero condimentum ac laoreet vitae.",
                    name: "Coriss Ambady",
                    position: "Financial Analyst",
                    avatar: "/img/te4.jpg"
                },
                {
                    quote: "Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus magnis dis montes, nascetur ridiculus mus. Donec sed odio dui. Nulla vitae elit libero.",
                    name: "Jackie Sanders",
                    position: "Investment Planner",
                    avatar: "/img/te5.jpg"
                },
                {
                    quote: "Donec id elit non mi porta gravida at eget metus. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
                    name: "Laura Widerski",
                    position: "Sales Specialist",
                    avatar: "/img/te6.jpg"
                }
            ]
        }
    }
    
}
</script>

<style scoped>
/* Custom styles for better card layout */
.card {
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15) !important;
}

/* Stars styling */
.ratings-stars {
    display: flex;
    gap: 2px;
}

.star-icon {
    color: #ffc107;
    font-size: 1.1rem;
    font-style: normal;
}

/* Avatar styling */
.avatar-img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    flex-shrink: 0;
}

.blockquote-details {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.blockquote-details .info h5 {
    font-weight: 600;
    color: #343a40;
}

.blockquote-details .info p {
    color: #6c757d;
    font-size: 0.875rem;
}

/* Quote styling */
blockquote p {
    font-style: italic;
    color: #495057;
    line-height: 1.6;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .col-md-6 {
        margin-bottom: 1.5rem;
    }
    
    .avatar-img {
        width: 40px;
        height: 40px;
    }
}

@media (min-width: 992px) {
    .row.gy-4 {
        --bs-gutter-y: 2rem;
    }
}
</style>